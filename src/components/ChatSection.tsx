import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Clock, MapPin, Coffee, UtensilsCrossed, Car, Key, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'system' | 'itinerary';
  content: string;
  timestamp: Date;
  location?: string;
  time?: string;
}

const ChatSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: "Hi! I'm here to help you plan the perfect itinerary. Tell me what you'd like to do today - where you want to eat, places to visit, or activities you're interested in!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiKeyInput(true);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to use the chat.",
        variant: "destructive"
      });
      return;
    }
    localStorage.setItem('openai_api_key', apiKey);
    setShowApiKeyInput(false);
    toast({
      title: "API Key Saved",
      description: "You can now start chatting with the AI assistant!"
    });
  };

  const callOpenAI = async (userMessage: string) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful travel assistant that helps users plan their itineraries. Be concise, friendly, and focus on providing specific recommendations with times and locations when possible. Keep responses under 100 words.'
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    if (!apiKey) {
      setShowApiKeyInput(true);
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key first.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiContent = await callOpenAI(inputValue);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'itinerary',
        content: aiContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: "Sorry, I'm having trouble connecting to the AI service. Please check your API key and try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Failed to get AI response. Please check your API key.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'user': return <Clock className="h-4 w-4 text-primary" />;
      case 'system': return <MapPin className="h-4 w-4 text-secondary" />;
      case 'itinerary': return <Coffee className="h-4 w-4 text-accent" />;
      default: return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-lg shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 bg-gradient-to-r from-secondary/5 to-accent/5 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5 text-secondary" />
              Plan Your Day
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Describe your ideal itinerary and I'll map it out for you
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* API Key Input */}
      {showApiKeyInput && (
        <div className="p-4 bg-muted/20 border-b border-border">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Key className="h-4 w-4" />
              OpenAI API Key
            </div>
            <div className="flex gap-2">
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="flex-1"
              />
              <Button onClick={saveApiKey} size="sm">
                Save
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Your API key is stored locally and never sent to our servers. Get yours at{' '}
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">
                OpenAI Platform
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.type !== 'user' && (
              <div className="flex-shrink-0 w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                {getMessageIcon(message.type)}
              </div>
            )}
            
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : message.type === 'itinerary'
                  ? 'bg-gradient-to-r from-secondary/10 to-accent/10 border border-border'
                  : 'bg-muted'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              
              {message.type === 'itinerary' && message.location && (
                <div className="mt-2 pt-2 border-t border-border/50">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{message.location}</span>
                    <span>•</span>
                    <Clock className="h-3 w-3" />
                    <span>{message.time}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Car className="h-3 w-3 mr-1" />
                      5 min drive
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Add to route
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground mt-2">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>

            {message.type === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-primary" />
              </div>
             )}
           </div>
         ))}
         
         {isLoading && (
           <div className="flex justify-start">
             <div className="flex-shrink-0 w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
               <Coffee className="h-4 w-4 text-accent" />
             </div>
             <div className="max-w-[80%] rounded-lg p-3 bg-gradient-to-r from-secondary/10 to-accent/10 border border-border ml-3">
               <div className="flex items-center gap-2">
                 <div className="animate-pulse flex space-x-1">
                   <div className="rounded-full bg-accent h-2 w-2"></div>
                   <div className="rounded-full bg-accent h-2 w-2"></div>
                   <div className="rounded-full bg-accent h-2 w-2"></div>
                 </div>
                 <span className="text-sm text-muted-foreground">AI is thinking...</span>
               </div>
             </div>
           </div>
         )}
         
         <div ref={messagesEndRef} />
       </div>

      {/* Sample Itinerary Timeline */}
      <div className="p-4 bg-gradient-to-r from-muted/50 to-background border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Your Itinerary</h4>
        <div className="space-y-2">
          {[
            { time: "2:00 PM", activity: "Coffee at Blue Bottle", icon: Coffee },
            { time: "3:30 PM", activity: "Walk through Central Park", icon: MapPin },
            { time: "6:00 PM", activity: "Dinner at The Plaza", icon: UtensilsCrossed }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-sm">
              <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                <item.icon className="h-3 w-3 text-accent" />
              </div>
              <span className="font-medium text-foreground min-w-[4rem]">{item.time}</span>
              <span className="text-muted-foreground">{item.activity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="I want to grab coffee at 2pm, then visit a museum..."
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} variant="gradient">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Be specific about times, locations, and preferences for the best results
        </p>
      </div>
    </div>
  );
};

export default ChatSection;