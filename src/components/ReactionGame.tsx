
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, Trophy, X } from 'lucide-react';

interface ReactionGameProps {
  onGameEnd: (result: { won: boolean; prize: number; time?: number }) => void;
}

export const ReactionGame = ({ onGameEnd }: ReactionGameProps) => {
  const [gameState, setGameState] = useState<'waiting' | 'ready' | 'go' | 'finished'>('waiting');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [opponent, setOpponent] = useState({ name: 'Player_7483', time: 0 });
  const [countdown, setCountdown] = useState(3);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Start countdown when component mounts
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setGameState('ready');
          // Random delay before "GO!"
          const delay = Math.random() * 3000 + 2000; // 2-5 seconds
          timeoutRef.current = setTimeout(() => {
            setGameState('go');
            startTimeRef.current = Date.now();
          }, delay);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    if (gameState === 'go') {
      const time = Date.now() - startTimeRef.current;
      setReactionTime(time);
      
      // Simulate opponent reaction time (slightly worse to make player feel good)
      const opponentTime = time + Math.random() * 100 + 50;
      setOpponent(prev => ({ ...prev, time: opponentTime }));
      
      setGameState('finished');
    } else if (gameState === 'ready') {
      // Clicked too early
      setReactionTime(-1);
      setGameState('finished');
    }
  };

  const getResult = () => {
    if (reactionTime === -1) return { won: false, message: 'Too early! Wait for GO!' };
    if (reactionTime === null) return { won: false, message: 'No reaction recorded' };
    
    const won = reactionTime < opponent.time;
    return {
      won,
      message: won ? 'Victory! You were faster!' : 'Defeat! Better luck next time!'
    };
  };

  const handleGameEnd = () => {
    const result = getResult();
    onGameEnd({
      won: result.won,
      prize: result.won ? 5.0 : 0,
      time: reactionTime || 0
    });
  };

  const getStateDisplay = () => {
    switch (gameState) {
      case 'waiting':
        return {
          title: 'Get Ready!',
          subtitle: `Starting in ${countdown}...`,
          bgColor: 'bg-yellow-500/20',
          textColor: 'text-yellow-400'
        };
      case 'ready':
        return {
          title: 'Wait for it...',
          subtitle: 'Click when you see GO!',
          bgColor: 'bg-red-500/20',
          textColor: 'text-red-400'
        };
      case 'go':
        return {
          title: 'GO!',
          subtitle: 'Click now!',
          bgColor: 'bg-green-500/20',
          textColor: 'text-green-400'
        };
      case 'finished':
        const result = getResult();
        return {
          title: result.message,
          subtitle: reactionTime === -1 
            ? 'You clicked too early!' 
            : `Your time: ${reactionTime}ms`,
          bgColor: result.won ? 'bg-green-500/20' : 'bg-red-500/20',
          textColor: result.won ? 'text-green-400' : 'text-red-400'
        };
    }
  };

  const display = getStateDisplay();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center">
          <Zap className="w-8 h-8 mr-3 text-yellow-400" />
          Lightning Reflexes
        </h1>
        <Button variant="outline" onClick={() => onGameEnd({ won: false, prize: 0 })}>
          <X className="w-4 h-4 mr-2" />
          Exit Game
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="game-card">
          <CardHeader>
            <CardTitle className="text-lg">You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-blue-400">P1</span>
              </div>
              <p className="font-medium">Player</p>
              {reactionTime !== null && reactionTime !== -1 && (
                <Badge variant="outline" className="text-blue-400 border-blue-400">
                  {reactionTime}ms
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className={`game-card ${display.bgColor} cursor-pointer transition-all duration-200 hover:scale-105`} onClick={handleClick}>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <h2 className={`text-4xl font-bold ${display.textColor}`}>
                {display.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {display.subtitle}
              </p>
              
              {gameState === 'finished' && (
                <div className="pt-4 space-y-4">
                  <div className="flex justify-center space-x-8 text-sm">
                    <div className="text-center">
                      <p className="text-blue-400 font-bold">
                        {reactionTime === -1 ? 'EARLY' : `${reactionTime}ms`}
                      </p>
                      <p className="text-muted-foreground">You</p>
                    </div>
                    <div className="text-center">
                      <p className="text-purple-400 font-bold">{Math.round(opponent.time)}ms</p>
                      <p className="text-muted-foreground">{opponent.name}</p>
                    </div>
                  </div>
                  
                  <Button onClick={handleGameEnd} className="w-full">
                    <Trophy className="w-4 h-4 mr-2" />
                    Continue
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="game-card">
          <CardHeader>
            <CardTitle className="text-lg">Opponent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-purple-400">P2</span>
              </div>
              <p className="font-medium">{opponent.name}</p>
              {gameState === 'finished' && opponent.time > 0 && (
                <Badge variant="outline" className="text-purple-400 border-purple-400">
                  {Math.round(opponent.time)}ms
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="game-card">
        <CardHeader>
          <CardTitle>Game Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Stake Amount</p>
              <p className="text-lg font-bold text-yellow-400">2.5 ICP</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prize Pool</p>
              <p className="text-lg font-bold text-green-400">5.0 ICP</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Game Type</p>
              <p className="text-lg font-bold">Reaction Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
