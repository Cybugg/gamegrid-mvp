
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Clock, Coins } from 'lucide-react';

interface Game {
  id: string;
  name: string;
  description: string;
  stakeAmount: number;
  maxPlayers: number;
  currentPlayers: number;
  icon: React.ElementType;
  difficulty: string;
}

interface GameLobbyProps {
  games: Game[];
  onJoinGame: (gameId: string) => void;
}

export const GameLobby = ({ games, onJoinGame }: GameLobbyProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 border-green-400';
      case 'Medium': return 'text-yellow-400 border-yellow-400';
      case 'Hard': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => {
        const playerProgress = (game.currentPlayers / game.maxPlayers) * 100;
        const GameIcon = game.icon;
        
        return (
          <Card key={game.id} className="game-card hover:glow-orange transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <GameIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{game.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <CardDescription className="text-sm">
                {game.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-1">
                  <Coins className="w-4 h-4 text-yellow-400" />
                  <span className="font-mono font-bold text-yellow-400">
                    {game.stakeAmount} ICP
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{game.currentPlayers}/{game.maxPlayers}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Players waiting</span>
                  <span>{game.currentPlayers} joined</span>
                </div>
                <Progress value={playerProgress} className="h-2" />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400"
                  onClick={() => onJoinGame(game.id)}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Quick Match
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground text-center">
                Winner takes all • Fair play guaranteed
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
