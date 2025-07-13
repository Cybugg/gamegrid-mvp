
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Shield, Zap } from 'lucide-react';

interface WalletConnectionProps {
  onConnect: () => void;
}

export const WalletConnection = ({ onConnect }: WalletConnectionProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async (walletType: string) => {
    setIsConnecting(true);
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false);
      onConnect();
    }, 2000);
  };

  const wallets = [
    {
      name: 'Internet Identity',
      description: 'Native ICP authentication',
      icon: Shield,
      recommended: true
    },
    {
      name: 'Plug Wallet',
      description: 'Popular ICP wallet',
      icon: Wallet,
      recommended: false
    },
    {
      name: 'NFID',
      description: 'Secure identity provider',
      icon: Zap,
      recommended: false
    }
  ];

  return (
    <div className="max-w-md mx-auto">
      <Card className="game-card glow-green">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Connect Wallet</CardTitle>
          <CardDescription>
            Choose your preferred wallet to start competing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {wallets.map((wallet) => (
            <Button
              key={wallet.name}
              variant="outline"
              className="w-full justify-start h-auto p-4 text-white border-border hover:border-primary/50 hover:bg-primary/5"
              onClick={() => handleConnect(wallet.name)}
              disabled={isConnecting}
            >
              <wallet.icon className="w-6 h-6 mr-3 text-white " />
              <div className="text-left text-white  flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{wallet.name}</span>
                  {wallet.recommended && (
                    <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{wallet.description}</p>
              </div>
            </Button>
          ))}
          
          {isConnecting && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <p className="text-sm text-muted-foreground mt-2">Connecting...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
