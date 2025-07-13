import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GameHeader } from '@/components/GameHeader';
import { WalletConnection } from '@/components/WalletConnection';
import { GameLobby } from '@/components/GameLobby';
import { PlayerStats } from '@/components/PlayerStats';
import { GridBlaster } from '@/components/GridBlaster';
import { Leaderboard } from '@/components/Leaderboard';
import { Trophy, Zap, Target, Users } from 'lucide-react';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [playerStats, setPlayerStats] = useState({
    balance: 125.5,
    gamesWon: 23,
    gamesPlayed: 45,
    totalEarned: 450.2,
    winRate: 51
  });

  const games = [
    {
      id: 'gridblaster',
      name: 'Grid Blaster',
      description: 'Top-down battle shooter in neon arena',
      stakeAmount: 2.5,
      maxPlayers: 2,
      currentPlayers: 1,
      icon: Zap,
      difficulty: 'Medium'
    },
    {
      id: 'precision',
      name: 'Precision Strike',
      description: 'Hit targets with perfect accuracy',
      stakeAmount: 5.0,
      maxPlayers: 2,
      currentPlayers: 1,
      icon: Target,
      difficulty: 'Medium'
    },
    {
      id: 'tournament',
      name: 'Championship Arena',
      description: 'Winner-takes-all tournament',
      stakeAmount: 10.0,
      maxPlayers: 8,
      currentPlayers: 6,
      icon: Trophy,
      difficulty: 'Hard'
    }
  ];

  if (currentGame) {
    return (
      <div className="min-h-screen gradient-bg">
        <GameHeader isConnected={isConnected} playerStats={playerStats} />
        <div className="container mx-auto px-4 py-8">
          <GridBlaster onGameEnd={(result) => {
            if (result.won) {
              setPlayerStats(prev => ({
                ...prev,
                balance: prev.balance + result.prize,
                gamesWon: prev.gamesWon + 1,
                gamesPlayed: prev.gamesPlayed + 1,
                totalEarned: prev.totalEarned + result.prize
              }));
            } else {
              setPlayerStats(prev => ({
                ...prev,
                gamesPlayed: prev.gamesPlayed + 1
              }));
            }
            setCurrentGame(null);
          }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <GameHeader isConnected={isConnected} playerStats={playerStats} />
      
      <main className="container mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold mb-4 bg-white bg-clip-text text-transparent neon-text flex items-center justify-center gap-2">
               <img  src='logo.png' className='h-12 w-12 rounded'/> GameGrid
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Where skill meets reward. Stake tokens, compete in real-time games, and winners take all.
              </p>
            </div>
            
            <WalletConnection onConnect={() => setIsConnected(true)} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-orange">
                  <Zap className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-Time Competition</h3>
                <p className="text-muted-foreground">Face opponents in live multiplayer matches</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-blue">
                  <Target className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Skill-Based Rewards</h3>
                <p className="text-muted-foreground">Win tokens based on performance, not luck</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-purple">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Fair Competition</h3>
                <p className="text-muted-foreground">Transparent, blockchain-secured gameplay</p>
              </div>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="games" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-card">
              <TabsTrigger value="games">Games</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
            </TabsList>

            <TabsContent value="games" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Available Games</h2>
                <Badge variant="outline" className="text-green-400 border-green-400">
                  {games.reduce((sum, game) => sum + game.currentPlayers, 0)} players online
                </Badge>
              </div>
              
              <GameLobby games={games} onJoinGame={setCurrentGame} />
            </TabsContent>

            <TabsContent value="stats" className="space-y-6">
              <PlayerStats stats={playerStats} />
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <Leaderboard />
            </TabsContent>

            <TabsContent value="tournaments" className="space-y-6">
              <div className="text-center py-16">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-2xl font-bold mb-2">Tournaments Coming Soon</h3>
                <p className="text-muted-foreground">Epic tournaments with massive prize pools</p>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default Index;
