import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Clock, MapPin, Coffee, UtensilsCrossed, Car } from 'lucide-react';

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

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    // Mock AI response
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'itinerary',
      content: `Great idea! I've found some options for "${inputValue}". Let me create a route for you.`,
      timestamp: new Date(),
      location: "Central Park",
      time: "2:30 PM"
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInputValue('');
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
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5 text-secondary" />
          Plan Your Day
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Describe your ideal itinerary and I'll map it out for you
        </p>
      </div>

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