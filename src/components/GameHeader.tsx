
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, Trophy, Coins } from 'lucide-react';


// You know lets says some sample props for the header, you get?
interface GameHeaderProps {
  isConnected: boolean;
  playerStats: {
    balance: number;
    gamesWon: number;
    winRate: number;

  };
}

export const GameHeader = ({ isConnected, playerStats }: GameHeaderProps) => {




  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
               <h1 className="text-2xl font-bold bg-white bg-clip-text flex items-center justify-center gap-2 text-transparent">
               <img  src='logo.png' className='h-6 w-6 rounded'/>  GameGrid
            </h1>
            <Badge variant="outline" className="text-orange-400 border-orange-400">
              BETA
            </Badge>
          </div>

              {isConnected && (
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="font-mono font-bold text-yellow-400">
                  {playerStats.balance.toFixed(1)} ICP
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-orange-400" />
                <span className="text-sm">
                  {playerStats.gamesWon} wins ({playerStats.winRate}%)
                  </span>
              </div>
              
              <Button variant="outline" size="sm" className="border-green-400 text-green-400 hover:bg-green-400/10">
                <Wallet className="w-4 h-4 mr-2" />
                Connected
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
