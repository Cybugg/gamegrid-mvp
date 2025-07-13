
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

export const Leaderboard = () => {
  const leaderboardData = [
    {
      rank: 1,
      name: 'ProGamer_2024',
      gamesWon: 147,
      winRate: 89,
      totalEarned: 2456.7,
      avatar: 'PG'
    },
    {
      rank: 2,
      name: 'Lightning_Fast',
      gamesWon: 132,
      winRate: 85,
      totalEarned: 2103.4,
      avatar: 'LF'
    },
    {
      rank: 3,
      name: 'ReflexMaster',
      gamesWon: 98,
      winRate: 82,
      totalEarned: 1876.2,
      avatar: 'RM'
    },
    {
      rank: 4,
      name: 'QuickDraw_99',
      gamesWon: 87,
      winRate: 78,
      totalEarned: 1654.8,
      avatar: 'QD'
    },
    {
      rank: 5,
      name: 'SpeedDemon',
      gamesWon: 76,
      winRate: 75,
      totalEarned: 1432.1,
      avatar: 'SD'
    },
    {
      rank: 6,
      name: 'You',
      gamesWon: 23,
      winRate: 51,
      totalEarned: 450.2,
      avatar: 'YO',
      isCurrentUser: true
    },
    {
      rank: 7,
      name: 'Challenger_X',
      gamesWon: 65,
      winRate: 72,
      totalEarned: 1287.5,
      avatar: 'CX'
    },
    {
      rank: 8,
      name: 'GameKnight',
      gamesWon: 54,
      winRate: 69,
      totalEarned: 1123.7,
      avatar: 'GK'
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Trophy className="w-5 h-5 text-gray-300" />;
      case 3:
        return <Medal className="w-5 h-5 text-orange-400" />;
      default:
        return <Award className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10';
      case 2:
        return 'text-gray-300 border-gray-300/20 bg-gray-300/10';
      case 3:
        return 'text-orange-400 border-orange-400/20 bg-orange-400/10';
      default:
        return 'text-muted-foreground border-border bg-secondary/50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Leaderboard</h2>
        <Badge variant="outline" className="text-green-400 border-green-400">
          Global Rankings
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 3 Podium */}
        <div className="lg:col-span-1">
          <Card className="game-card glow-purple">
            <CardHeader>
              <CardTitle className="text-center">Top Champions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {leaderboardData.slice(0, 3).map((player) => (
                <div key={player.rank} className={`flex items-center space-x-3 p-4 rounded-lg border ${getRankColor(player.rank)}`}>
                  <div className="flex items-center space-x-2">
                    {getRankIcon(player.rank)}
                    <span className="font-bold text-2xl">#{player.rank}</span>
                  </div>
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/20 text-primary font-bold">
                      {player.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-bold">{player.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {player.gamesWon} wins • {player.winRate}% WR
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-yellow-400">
                      {player.totalEarned.toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">ICP</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Full Rankings */}
        <div className="lg:col-span-2">
          <Card className="game-card">
            <CardHeader>
              <CardTitle>Full Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboardData.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 hover:bg-secondary/50 ${
                      player.isCurrentUser 
                        ? 'border-primary/50 bg-primary/5 ring-1 ring-primary/20' 
                        : 'border-border'
                    }`}
                  >
                    <div className="flex items-center space-x-2 w-16">
                      <span className="font-bold text-lg">#{player.rank}</span>
                    </div>
                    
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className={`${
                        player.isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                      } font-bold text-sm`}>
                        {player.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className={`font-medium ${player.isCurrentUser ? 'text-primary' : ''}`}>
                          {player.name}
                        </p>
                        {player.isCurrentUser && (
                          <Badge variant="outline" className="text-xs text-primary border-primary">
                            You
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-center w-20">
                      <p className="font-bold">{player.gamesWon}</p>
                      <p className="text-xs text-muted-foreground">Wins</p>
                    </div>
                    
                    <div className="text-center w-20">
                      <p className="font-bold">{player.winRate}%</p>
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                    </div>
                    
                    <div className="text-right w-24">
                      <p className="font-mono font-bold text-yellow-400">
                        {player.totalEarned.toFixed(1)}
                      </p>
                      <p className="text-xs text-muted-foreground">ICP</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
