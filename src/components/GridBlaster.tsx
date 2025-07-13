import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Settings, Users, Copy, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GameSettings {
  lives: number;
  timeLimit: number;
  basePrize: number;
}

interface Player {
  x: number;
  y: number;
  lives: number;
  direction: number;
  lastShot: number;
  color: string;
  avatar: string;
  name: string;
}

interface Bullet {
  x: number;
  y: number;
  dx: number;
  dy: number;
  owner: string;
  createdAt: number;
}

interface GridBlasterProps {
  onGameEnd: (result: { won: boolean; prize: number }) => void;
}

export const GridBlaster = ({ onGameEnd }: GridBlasterProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  
  const [gameState, setGameState] = useState<'settings' | 'waiting' | 'playing' | 'ended'>('settings');
  const [settings, setSettings] = useState<GameSettings>({
    lives: 3,
    timeLimit: 60,
    basePrize: 2.5
  });
  const [timeLeft, setTimeLeft] = useState(60);
  
  // Player avatars - using placeholder images
  const playerAvatars = [
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=100&h=100&fit=crop&crop=face'
  ];

  const [player1, setPlayer1] = useState<Player>({
    x: 100,
    y: 300,
    lives: 3,
    direction: 0,
    lastShot: 0,
    color: '#00ff41',
    avatar: playerAvatars[0],
    name: 'You'
  });
  const [player2, setPlayer2] = useState<Player>({
    x: 700,
    y: 300,
    lives: 3,
    direction: 180,
    lastShot: 0,
    color: '#ff0080',
    avatar: playerAvatars[1],
    name: 'AI Opponent'
  });
  
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [keys, setKeys] = useState<Set<string>>(new Set());
  const [winner, setWinner] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState<string>('');
  const [friendInviteCode, setFriendInviteCode] = useState<string>('');
  const [isWaitingForFriend, setIsWaitingForFriend] = useState(false);

  // Generate unique invite code
  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // Copy invite link to clipboard
  const copyInviteLink = () => {
    const inviteLink = `${window.location.origin}?invite=${inviteCode}`;
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Invite link copied!",
      description: "Share this link with your friend to join the match.",
    });
  };

  // Share invite code
  const shareInvite = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join my Grid Blaster match!',
        text: `Join me for a Grid Blaster duel! Use code: ${inviteCode}`,
        url: `${window.location.origin}?invite=${inviteCode}`
      });
    } else {
      copyInviteLink();
    }
  };

  // Join match with friend's code
  const joinFriendMatch = () => {
    if (friendInviteCode.length === 6) {
      setGameState('waiting');
      setIsWaitingForFriend(true);
      toast({
        title: "Joining match...",
        description: `Connecting to match with code: ${friendInviteCode}`,
      });
      // Simulate connection - in real app this would connect to actual match
      setTimeout(() => {
        setIsWaitingForFriend(false);
        startGame();
      }, 2000);
    }
  };

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const PLAYER_SIZE = 16;
  const BULLET_SIZE = 4;
  const BULLET_SPEED = 8;
  const PLAYER_SPEED = 4;
  const SHOT_COOLDOWN = 300;
  const BULLET_LIFETIME = 2000;

  const checkCollisions = useCallback(() => {
    setBullets(prevBullets => {
      const newBullets = [...prevBullets];
      let p1Hit = false;
      let p2Hit = false;

      for (let i = newBullets.length - 1; i >= 0; i--) {
        const bullet = newBullets[i];
        
        if (bullet.owner === 'player2' && 
            bullet.x < player1.x + PLAYER_SIZE && bullet.x + BULLET_SIZE > player1.x &&
            bullet.y < player1.y + PLAYER_SIZE && bullet.y + BULLET_SIZE > player1.y) {
          p1Hit = true;
          newBullets.splice(i, 1);

        } 
        
        else if (bullet.owner === 'player1' && 
                   bullet.x < player2.x + PLAYER_SIZE && bullet.x + BULLET_SIZE > player2.x &&
                   bullet.y < player2.y + PLAYER_SIZE && bullet.y + BULLET_SIZE > player2.y) {
          p2Hit = true;
          newBullets.splice(i, 1);
        }
      }

      if (p1Hit) {
        setPlayer1(prev => ({ ...prev, lives: prev.lives - 1 }));
      }
      if (p2Hit) {
        setPlayer2(prev => ({ ...prev, lives: prev.lives - 1 }));
      }

      return newBullets;
    });
  }, [player1.x, player1.y, player2.x, player2.y]);

  const updateBullets = useCallback(() => {
    setBullets(prevBullets => 
      prevBullets
        .map(bullet => ({
          ...bullet,
          x: bullet.x + bullet.dx,
          y: bullet.y + bullet.dy
        }))
        .filter(bullet => 
          bullet.x > 0 && bullet.x < CANVAS_WIDTH &&
          bullet.y > 0 && bullet.y < CANVAS_HEIGHT &&
          Date.now() - bullet.createdAt < BULLET_LIFETIME
        )
    );
  }, []);

  const movePlayer = useCallback((player: Player, keys: Set<string>, isPlayer1: boolean) => {
    let newX = player.x;
    let newY = player.y;
    let newDirection = player.direction;

    const upKey = isPlayer1 ? 'KeyW' : 'ArrowUp';
    const downKey = isPlayer1 ? 'KeyS' : 'ArrowDown';
    const leftKey = isPlayer1 ? 'KeyA' : 'ArrowLeft';
    const rightKey = isPlayer1 ? 'KeyD' : 'ArrowRight';

    if (keys.has(upKey)) {
      newY = Math.max(0, newY - PLAYER_SPEED);
      newDirection = 270;
    }
    if (keys.has(downKey)) {
      newY = Math.min(CANVAS_HEIGHT - PLAYER_SIZE, newY + PLAYER_SPEED);
      newDirection = 90;
    }
    if (keys.has(leftKey)) {
      newX = Math.max(0, newX - PLAYER_SPEED);
      newDirection = 180;
    }
    if (keys.has(rightKey)) {
      newX = Math.min(CANVAS_WIDTH - PLAYER_SIZE, newX + PLAYER_SPEED);
      newDirection = 0;
    }

    return { ...player, x: newX, y: newY, direction: newDirection };
  }, []);

  const shoot = useCallback((player: Player, isPlayer1: boolean) => {
    const now = Date.now();
    if (now - player.lastShot < SHOT_COOLDOWN) return player;

    const angle = (player.direction * Math.PI) / 180;
    const bulletX = player.x + PLAYER_SIZE / 2;
    const bulletY = player.y + PLAYER_SIZE / 2;

    const newBullet: Bullet = {
      x: bulletX,
      y: bulletY,
      dx: Math.cos(angle) * BULLET_SPEED,
      dy: Math.sin(angle) * BULLET_SPEED,
      owner: isPlayer1 ? 'player1' : 'player2',
      createdAt: now
    };

    setBullets(prev => [...prev, newBullet]);
    return { ...player, lastShot: now };
  }, []);

  const updateAI = useCallback(() => {
    if (gameState !== 'playing') return;

    setPlayer2(prev => {
      let newPlayer = { ...prev };
      
      const dx = player1.x - prev.x;
      const dy = player1.y - prev.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 100) {
        if (Math.abs(dx) > Math.abs(dy)) {
          newPlayer.x += dx > 0 ? PLAYER_SPEED : -PLAYER_SPEED;
          newPlayer.direction = dx > 0 ? 0 : 180;
        } else {
          newPlayer.y += dy > 0 ? PLAYER_SPEED : -PLAYER_SPEED;
          newPlayer.direction = dy > 0 ? 90 : 270;
        }
      }
      
      newPlayer.x = Math.max(0, Math.min(CANVAS_WIDTH - PLAYER_SIZE, newPlayer.x));
      newPlayer.y = Math.max(0, Math.min(CANVAS_HEIGHT - PLAYER_SIZE, newPlayer.y));
      
      if (Math.random() < 0.02) {
        newPlayer = shoot(newPlayer, false);
      }
      
      return newPlayer;
    });
  }, [gameState, player1.x, player1.y, shoot]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const gridSize = 40;
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= CANVAS_WIDTH; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_HEIGHT);
      ctx.stroke();
    }
    
    for (let y = 0; y <= CANVAS_HEIGHT; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_WIDTH, y);
      ctx.stroke();
    }

    const drawPlayer = (player: Player, label: string) => {
      // Draw player rectangle
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, PLAYER_SIZE, PLAYER_SIZE);
      
      ctx.strokeStyle = player.color;
      ctx.lineWidth = 2;
      ctx.strokeRect(player.x - 2, player.y - 2, PLAYER_SIZE + 4, PLAYER_SIZE + 4);
      
      // Draw direction line
      const angle = (player.direction * Math.PI) / 180;
      const centerX = player.x + PLAYER_SIZE / 2;
      const centerY = player.y + PLAYER_SIZE / 2;
      const endX = centerX + Math.cos(angle) * 12;
      const endY = centerY + Math.sin(angle) * 12;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // Draw avatar image inside player square
      const img = new Image();
      img.src = player.avatar;
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(player.x, player.y, PLAYER_SIZE, PLAYER_SIZE);
        ctx.clip();
        ctx.drawImage(img, player.x, player.y, PLAYER_SIZE, PLAYER_SIZE);
        ctx.restore();
      };

      // Draw label and lives
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.fillText(label, player.x, player.y - 8);
      ctx.fillText(`${player.lives}❤️`, player.x, player.y + PLAYER_SIZE + 16);
    };

    drawPlayer(player1, 'P1');
    drawPlayer(player2, 'P2');

    bullets.forEach(bullet => {
      ctx.fillStyle = bullet.owner === 'player1' ? player1.color : player2.color;
      ctx.fillRect(bullet.x, bullet.y, BULLET_SIZE, BULLET_SIZE);
      
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 8;
      ctx.fillRect(bullet.x, bullet.y, BULLET_SIZE, BULLET_SIZE);
      ctx.shadowBlur = 0;
    });
  }, [player1, player2, bullets]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      setPlayer1(prev => movePlayer(prev, keys, true));
      updateBullets();
      checkCollisions();
      updateAI();
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameState, keys, movePlayer, updateBullets, checkCollisions, updateAI]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      
      setKeys(prev => new Set([...prev, e.code]));
      
      if (e.code === 'Space') {
        e.preventDefault();
        setPlayer1(prev => shoot(prev, true));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => {
        const newKeys = new Set(prev);
        newKeys.delete(e.code);
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, shoot]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          const p1Lives = player1.lives;
          const p2Lives = player2.lives;
          
          if (p1Lives > p2Lives) {
            setWinner('Player 1');
          } else if (p2Lives > p1Lives) {
            setWinner('Player 2');
          } else {
            setWinner('Draw');
          }
          
          setGameState('ended');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, player1.lives, player2.lives]);

  useEffect(() => {
    if (player1.lives <= 0) {
      setWinner('Player 2');
      setGameState('ended');
    } else if (player2.lives <= 0) {
      setWinner('Player 1');
      setGameState('ended');
    }
  }, [player1.lives, player2.lives]);

  useEffect(() => {
    // Check for invite code in URL
    const urlParams = new URLSearchParams(window.location.search);
    const inviteParam = urlParams.get('invite');
    if (inviteParam) {
      setFriendInviteCode(inviteParam);
    }
  }, []);

  const startGame = () => {
    const newLives = settings.lives;
    setPlayer1(prev => ({ 
      ...prev, 
      lives: newLives, 
      x: 100, 
      y: 300,
      avatar: playerAvatars[Math.floor(Math.random() * playerAvatars.length)]
    }));
    setPlayer2(prev => ({ 
      ...prev, 
      lives: newLives, 
      x: 700, 
      y: 300,
      avatar: playerAvatars[Math.floor(Math.random() * playerAvatars.length)]
    }));
    setBullets([]);
    setTimeLeft(settings.timeLimit);
    setWinner(null);
    setGameState('playing');
  };

  const startWithFriend = () => {
    setInviteCode(generateInviteCode());
    setPlayer2(prev => ({
      ...prev,
      name: 'Friend',
      avatar: playerAvatars[Math.floor(Math.random() * playerAvatars.length)]
    }));
    setGameState('waiting');
    setIsWaitingForFriend(true);
    // Simulate waiting for friend - in real app this would create actual match room
    setTimeout(() => {
      setIsWaitingForFriend(false);
      startGame();
    }, 3000);
  };

  const endGame = () => {
    const won = winner === 'Player 1';
    const prize = won ? settings.basePrize * 2 : 0;
    onGameEnd({ won, prize });
  };

  if (gameState === 'settings') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={() => onGameEnd({ won: false, prize: 0 })}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lobby
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
            Grid Blaster
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="game-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Game Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Lives per Player</Label>
                <div className="flex space-x-2 mt-2">
                  {[3, 5, 10].map(lives => (
                    <Button
                      key={lives}
                      variant={settings.lives === lives ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSettings(prev => ({ ...prev, lives }))}
                    >
                      {lives} Lives
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Time Limit</Label>
                <div className="flex space-x-2 mt-2">
                  {[30, 60, 90].map(time => (
                    <Button
                      key={time}
                      variant={settings.timeLimit === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSettings(prev => ({ ...prev, timeLimit: time }))}
                    >
                      {time}s
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Stake Amount</Label>
                <div className="flex space-x-2 mt-2">
                  {[1, 2.5, 5, 10].map(prize => (
                    <Button
                      key={prize}
                      variant={settings.basePrize === prize ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSettings(prev => ({ ...prev, basePrize: prize }))}
                    >
                      {prize} ICP
                    </Button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>Total Prize Pool:</span>
                  <span className="font-mono font-bold text-yellow-400">
                    {settings.basePrize * 2} ICP
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-500"
                    onClick={startGame}
                  >
                    Play vs AI
                  </Button>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-green-500"
                    onClick={startWithFriend}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Play with Friend
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="game-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Player Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12 border-2" style={{ borderColor: player1.color }}>
                    <AvatarImage src={player1.avatar} alt="Player 1" />
                    <AvatarFallback style={{ backgroundColor: player1.color + '20', color: player1.color }}>
                      P1
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold" style={{ color: player1.color }}>{player1.name}</p>
                    <p className="text-sm text-muted-foreground">Player 1</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">VS</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="font-semibold" style={{ color: player2.color }}>{player2.name}</p>
                    <p className="text-sm text-muted-foreground">Player 2</p>
                  </div>
                  <Avatar className="w-12 h-12 border-2" style={{ borderColor: player2.color }}>
                    <AvatarImage src={player2.avatar} alt="Player 2" />
                    <AvatarFallback style={{ backgroundColor: player2.color + '20', color: player2.color }}>
                      P2
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">Controls</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div><strong>Player 1:</strong> W/A/S/D to move, Space to shoot</div>
                  <div><strong>Player 2:</strong> Arrow keys to move, Enter to shoot</div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">Game Rules</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• First to eliminate opponent or most lives when time runs out wins</div>
                  <div>• Players have a shooting cooldown to prevent spam</div>
                  <div>• Bullets have limited lifetime and range</div>
                  <div>• Winner takes the entire prize pool</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === 'waiting') {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Button variant="ghost" onClick={() => setGameState('settings')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
            Grid Blaster
          </h1>
        </div>

        <Card className="game-card">
          <CardHeader>
            <CardTitle>
              {isWaitingForFriend ? 'Waiting for Friend...' : 'Match Ready!'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {inviteCode && (
              <div className="space-y-4">
                <div>
                  <Label>Share this code with your friend:</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      value={inviteCode}
                      readOnly
                      className="font-mono text-center text-2xl font-bold"
                    />
                    <Button onClick={copyInviteLink} size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button onClick={shareInvite} size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Or share this link: {window.location.origin}?invite={inviteCode}
                </div>
              </div>
            )}

            <div className="animate-pulse">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground">
                {isWaitingForFriend ? 'Connecting to match...' : 'Starting game...'}
              </p>
            </div>

            <div className="text-sm text-muted-foreground">
              <div>Prize Pool: <span className="font-mono font-bold text-yellow-400">{settings.basePrize * 2} ICP</span></div>
              <div>Lives: {settings.lives} each</div>
              <div>Time Limit: {settings.timeLimit}s</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'ended') {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold mb-8">
          {winner === 'Player 1' ? (
            <span className="text-green-400">Victory! 🎉</span>
          ) : winner === 'Player 2' ? (
            <span className="text-red-400">Defeat 💀</span>
          ) : (
            <span className="text-yellow-400">Draw! 🤝</span>
          )}
        </h1>

        <Card className="game-card">
          <CardHeader>
            <CardTitle>Match Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className={`p-4 rounded-lg ${winner === 'Player 1' ? 'bg-green-500/20 border border-green-500' : 'bg-gray-500/20'}`}>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Avatar className="w-8 h-8 border-2" style={{ borderColor: player1.color }}>
                    <AvatarImage src={player1.avatar} alt="Player 1" />
                    <AvatarFallback style={{ backgroundColor: player1.color + '20', color: player1.color }}>
                      P1
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-lg font-bold" style={{ color: player1.color }}>{player1.name}</div>
                </div>
                <div className="text-2xl">{player1.lives}❤️</div>
              </div>
              <div className={`p-4 rounded-lg ${winner === 'Player 2' ? 'bg-green-500/20 border border-green-500' : 'bg-gray-500/20'}`}>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Avatar className="w-8 h-8 border-2" style={{ borderColor: player2.color }}>
                    <AvatarImage src={player2.avatar} alt="Player 2" />
                    <AvatarFallback style={{ backgroundColor: player2.color + '20', color: player2.color }}>
                      P2
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-lg font-bold" style={{ color: player2.color }}>{player2.name}</div>
                </div>
                <div className="text-2xl">{player2.lives}❤️</div>
              </div>
            </div>

            {winner === 'Player 1' && (
              <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500">
                <div className="text-lg font-bold text-green-400">Prize Won!</div>
                <div className="text-2xl font-mono font-bold text-yellow-400">
                  +{settings.basePrize * 2} ICP
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <Button 
                onClick={() => setGameState('settings')} 
                className="flex-1"
                variant="outline"
              >
                Play Again
              </Button>
              <Button 
                onClick={endGame} 
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500"
              >
                Return to Lobby
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Grid Blaster
          </h1>
          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
            Prize: {settings.basePrize * 2} ICP
          </Badge>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-orange-400 border-orange-400">
            Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </Badge>
          <div className="flex space-x-2">
            <div className="flex items-center space-x-1">
              <Avatar className="w-6 h-6 border" style={{ borderColor: player1.color }}>
                <AvatarImage src={player1.avatar} alt="Player 1" />
                <AvatarFallback style={{ backgroundColor: player1.color + '20', color: player1.color, fontSize: '10px' }}>
                  P1
                </AvatarFallback>
              </Avatar>
              <Badge variant="outline" style={{ color: player1.color, borderColor: player1.color }}>
                {player1.lives}❤️
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Avatar className="w-6 h-6 border" style={{ borderColor: player2.color }}>
                <AvatarImage src={player2.avatar} alt="Player 2" />
                <AvatarFallback style={{ backgroundColor: player2.color + '20', color: player2.color, fontSize: '10px' }}>
                  P2
                </AvatarFallback>
              </Avatar>
              <Badge variant="outline" style={{ color: player2.color, borderColor: player2.color }}>
                {player2.lives}❤️
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <Card className="game-card">
        <CardContent className="p-4">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="border border-gray-600 rounded-lg mx-auto block bg-black"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <strong>P1:</strong> W/A/S/D + Space | <strong>P2:</strong> Arrow Keys + Enter
      </div>
    </div>
  );
};
