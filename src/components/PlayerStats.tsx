
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Coins, TrendingUp, Award, Zap } from 'lucide-react';

interface PlayerStatsProps {
  stats: {
    balance: number;
    gamesWon: number;
    gamesPlayed: number;
    totalEarned: number;
    winRate: number;
  };
}

export const PlayerStats = ({ stats }: PlayerStatsProps) => {
  const statCards = [
    {
      title: 'Current Balance',
      value: `${stats.balance.toFixed(2)} ICP`,
      icon: Coins,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/20'
    },
    {
      title: 'Games Won',
      value: stats.gamesWon.toString(),
      icon: Trophy,
      color: 'text-green-400',
      bgColor: 'bg-green-400/20'
    },
    {
      title: 'Win Rate',
      value: `${stats.winRate}%`,
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20'
    },
    {
      title: 'Total Earned',
      value: `${stats.totalEarned.toFixed(2)} ICP`,
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/20'
    }
  ];

  const achievements = [
    { name: 'First Win', description: 'Won your first game', completed: true, icon: Award },
    { name: 'Hot Streak', description: 'Win 5 games in a row', completed: stats.gamesWon >= 5, icon: Zap },
    { name: 'Big Winner', description: 'Earn 100+ ICP', completed: stats.totalEarned >= 100, icon: Coins },
    { name: 'Champion', description: 'Achieve 70% win rate', completed: stats.winRate >= 70, icon: Trophy }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6">Player Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="game-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="game-card">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Your gaming statistics breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Win Rate</span>
                <span className="font-mono">{stats.winRate}%</span>
              </div>
              <Progress value={stats.winRate} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Games Completed</span>
                <span className="font-mono">{stats.gamesPlayed}</span>
              </div>
              <Progress value={(stats.gamesPlayed / 100) * 100} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">{stats.gamesWon}</p>
                <p className="text-xs text-muted-foreground">Wins</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-400">{stats.gamesPlayed - stats.gamesWon}</p>
                <p className="text-xs text-muted-foreground">Losses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="game-card">
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Unlock rewards as you play</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div key={achievement.name} className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/50">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    achievement.completed ? 'bg-green-400/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${achievement.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {achievement.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                  {achievement.completed && (
                    <div className="text-green-400 text-xs font-medium">Completed</div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
