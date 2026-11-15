import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/** Demo mode is on when the URL has ?demo=1. The header toggle writes the same param. */
export function useDemoMode(): [boolean, (on: boolean) => void] {
  const [params, setParams] = useSearchParams();
  const demo = params.get('demo') === '1';

  const setDemo = useCallback(
    (on: boolean) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (on) next.set('demo', '1');
          else {
            next.delete('demo');
            next.delete('area');
            next.delete('type');
          }
          return next;
        },
        { replace: true },
      );
    },
    [setParams],
  );

  return [demo, setDemo];
}
