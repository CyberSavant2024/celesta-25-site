"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const sponsorData = [
    { logo: "1amalfi.jpg", url: "https://amalfiindia.com/" },
    { logo: "2beardo.png", url: "https://www.beardo.in/" },
    { logo: "3bihartourism.png", url: "https://tourism.bihar.gov.in/" },
    { logo: "4bingo.png", url: "https://www.itcportal.com/brands-microsite/bingo.aspx" },
    { logo: "5brpnnl.png", url: "https://bihar.nic.in/" },
    { logo: "6bsacs.png", url: "https://x.com/bsacsofficial?lang=en" },
    { logo: "7coding ninjas.png", url: "https://www.codingninjas.com/" },
    { logo: "8coke.png", url: "https://www.coca-cola.com/in/en" },
    { logo: "9communityevents.png", url: "https://crowdsource.google.com/" },
    { logo: "10dubeat.png", url: "https://dubeat.com/" },
    { logo: "11eduquis.png", url: "https://eduquis.in/" },
    { logo: "12engconvo.png", url: "https://engconvo.com/" },
    { logo: "13eventom.png", url: "https://www.eventom.co.in/" },
    { logo: "14grabon.png", url: "https://www.grabon.in/" },
    { logo: "15hackerearth.png", url: "https://www.hackerearth.com/" },
    { logo: "16hero.png", url: "https://www.heromotocorp.com/" },
    { logo: "17himalayan yeti.png", url: "https://www.thehimalayanyeti.co.in/" },
    { logo: "18hp.png", url: "https://www.hindustanpetroleum.com/" },
    { logo: "19icetl.png", url: "#" },
    { logo: "20jetbrains.png", url: "https://www.jetbrains.com/" },
    { logo: "21jktyre.png", url: "https://www.jktyre.com/" },
    { logo: "22knowafest.png", url: "https://www.knowafest.com/" },
    { logo: "23lic.png", url: "https://licindia.in/" },
    { logo: "24lsmaster.jpg", url: "https://in.linkedin.com/parvagarwal" },
    { logo: "25nhai.jpg", url: "https://nhai.gov.in/" },
    { logo: "26ntpc.png", url: "https://www.ntpc.co.in/" },
    { logo: "27nvidia.png", url: "https://www.nvidia.com/" },
    { logo: "28patnabeats.png", url: "https://in.linkedin.com/company/patnabeats" },
    { logo: "29patriles.png", url: "#" },
    { logo: "30pizahut.png", url: "https://www.pizzahut.co.in/" },
    { logo: "31razorpay.png", url: "https://razorpay.com/" },
    { logo: "32redbull.jpg", url: "https://www.redbull.com/" },
    { logo: "33redfm.png", url: "https://www.redfmindia.in/" },
    { logo: "34sbi.png", url: "https://www.onlinesbi.sbi/" },
    { logo: "35souledstore.png", url: "https://www.thesouledstore.com/" },
    { logo: "36stpi.jpg", url: "https://stpi.in/" },
    { logo: "37strtupbihar.jpg", url: "https://startup.bihar.gov.in/" },
    { logo: "38swiggy.png", url: "https://www.swiggy.com/" },
    { logo: "39sybbline.png", url: "https://sibylline.co.uk/" },
    { logo: "40techbyte.png", url: "https://techbyte.co.in/" },
    { logo: "41techschool.png", url: "https://techprolabz.com/" },
    { logo: "42townscript.png", url: "https://www.townscript.com/" },
    { logo: "43udyogvibhag.jpg", url: "https://udyami.bihar.gov.in/" },
    { logo: "44ultratech.png", url: "https://www.ultratechcement.com/" },
    { logo: "45unstop.jpg", url: "https://unstop.com/" },
    { logo: "46youtuh incorporated.png", url: "https://youthincmag.com/" },
    { logo: "47zebronics.png", url: "https://zebronics.com/" }
];

const logosNeedingWhiteBg = [5, 6, 7, 20, 26, 27, 30, 35];

const sponsors = sponsorData.map((sponsor, i) => ({
    name: `Sponsor ${i + 1}`,
    logoUrl: `/spons_logos/${sponsor.logo}`,
    websiteUrl: sponsor.url,
    needsWhiteBg: logosNeedingWhiteBg.includes(i + 1),
}));

const SponsorCard = ({ sponsor }: { sponsor: { name: string, logoUrl: string, websiteUrl: string, needsWhiteBg: boolean } }) => {
    return (
        <motion.a
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative w-full h-full"
            whileHover={{ scale: 1.1, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            <div className="bg-slate-900/30 backdrop-blur-sm p-4 rounded-2xl border border-slate-700/50 group-hover:border-cyan-500/80 transition-all duration-300 h-full flex items-center justify-center aspect-[16/9] group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
                <div className={cn(
                    "w-full h-full rounded-lg flex items-center justify-center p-0 md:p-2",
                    sponsor.needsWhiteBg && "bg-white"
                )}>
                    <img
                        src={sponsor.logoUrl}
                        alt={`${sponsor.name} logo`}
                        className="max-h-full w-auto object-contain transition-transform duration-300"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://placehold.co/250x150/111827/FFFFFF?text=${sponsor.name.replace(' ', '+')}`;
                        }}
                    />
                </div>
            </div>
        </motion.a>
    );
};

const CodingBitsCelebration = () => {
    const bits = ['</>', '{}', '=>', '01', '()', '[]', '&&', '||', '!', '++'];
    const particles = Array.from({ length: 100 }).map((_, i) => {
        const bit = bits[Math.floor(Math.random() * bits.length)];
        const x = Math.random() * 100;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 2;
        const scale = 1 + Math.random() * 1.5;
        return (
            <motion.span
                key={i}
                initial={{ y: '-10vh', x: `${x}vw`, opacity: 0, scale: 0 }}
                animate={{ y: '110vh', opacity: 1, scale: scale }}
                transition={{ duration, delay, ease: "linear" }}
                className="absolute text-cyan-400/80 font-mono text-3xl"
            >
                {bit}
            </motion.span>
        );
    });

    return <div className="fixed inset-0 z-50 pointer-events-none">{particles}</div>;
};

// Space Shooter Game Component
const SpaceShooterGame = ({ onClose }: { onClose: () => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [gameKey, setGameKey] = useState(0); // Key to force re-mount
    const gameRef = useRef<{
        player: { x: number; y: number; width: number; height: number };
        bullets: { x: number; y: number; width: number; height: number }[];
        enemies: { x: number; y: number; width: number; height: number; speed: number; type: number }[];
        stars: { x: number; y: number; speed: number; size: number }[];
        keys: { [key: string]: boolean };
        animationId: number | null;
        lastEnemySpawn: number;
        lastBulletTime: number;
        lastFrameTime: number;
        score: number;
        gameOver: boolean;
    }>({
        player: { x: 0, y: 0, width: 40, height: 40 },
        bullets: [],
        enemies: [],
        stars: [],
        keys: {},
        animationId: null,
        lastEnemySpawn: 0,
        lastBulletTime: 0,
        lastFrameTime: 0,
        score: 0,
        gameOver: false,
    });

    useEffect(() => {
        const stored = localStorage.getItem('celestaSpaceHighScore');
        if (stored) setHighScore(parseInt(stored));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const game = gameRef.current;
        
        // Set canvas size
        canvas.width = Math.min(800, window.innerWidth - 40);
        canvas.height = Math.min(600, window.innerHeight - 200);

        // Initialize player position
        game.player.x = canvas.width / 2 - game.player.width / 2;
        game.player.y = canvas.height - 60;

        // Initialize stars
        game.stars = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: 1 + Math.random() * 2,
            size: Math.random() * 2 + 1,
        }));

        const handleKeyDown = (e: KeyboardEvent) => {
            game.keys[e.key] = true;
            if (e.key === ' ') {
                e.preventDefault();
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            game.keys[e.key] = false;
        };

        // Also handle click/tap to shoot
        const handleClick = () => {
            if (!game.gameOver) {
                game.bullets.push({
                    x: game.player.x + game.player.width / 2 - 3,
                    y: game.player.y,
                    width: 6,
                    height: 15,
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        canvas.addEventListener('click', handleClick);

        const spawnEnemy = () => {
            const types = [0, 1, 2]; // Different enemy types
            const type = types[Math.floor(Math.random() * types.length)];
            game.enemies.push({
                x: Math.random() * (canvas.width - 40),
                y: -40,
                width: 35,
                height: 35,
                speed: 1 + Math.random() * 1.5 + game.score / 1000, // Slower base speed
                type,
            });
        };

        const drawPlayer = () => {
            ctx.fillStyle = '#00ffff';
            ctx.beginPath();
            ctx.moveTo(game.player.x + game.player.width / 2, game.player.y);
            ctx.lineTo(game.player.x, game.player.y + game.player.height);
            ctx.lineTo(game.player.x + game.player.width, game.player.y + game.player.height);
            ctx.closePath();
            ctx.fill();
            
            // Glow effect
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.shadowBlur = 0;
        };

        const drawBullet = (bullet: typeof game.bullets[0]) => {
            ctx.fillStyle = '#ffff00';
            ctx.shadowColor = '#ffff00';
            ctx.shadowBlur = 10;
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            ctx.shadowBlur = 0;
        };

        const drawEnemy = (enemy: typeof game.enemies[0]) => {
            const colors = ['#ff4444', '#ff8800', '#ff00ff'];
            ctx.fillStyle = colors[enemy.type];
            ctx.shadowColor = colors[enemy.type];
            ctx.shadowBlur = 10;
            
            // Draw robot-like enemy
            ctx.fillRect(enemy.x + 5, enemy.y, enemy.width - 10, enemy.height - 10);
            ctx.fillRect(enemy.x, enemy.y + 10, enemy.width, enemy.height - 20);
            // Eyes
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(enemy.x + 8, enemy.y + 15, 6, 6);
            ctx.fillRect(enemy.x + enemy.width - 14, enemy.y + 15, 6, 6);
            ctx.shadowBlur = 0;
        };

        const drawStars = () => {
            game.stars.forEach(star => {
                ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`;
                ctx.fillRect(star.x, star.y, star.size, star.size);
                star.y += star.speed;
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
            });
        };

        const checkCollision = (rect1: any, rect2: any) => {
            return rect1.x < rect2.x + rect2.width &&
                   rect1.x + rect1.width > rect2.x &&
                   rect1.y < rect2.y + rect2.height &&
                   rect1.y + rect1.height > rect2.y;
        };

        const gameLoop = (timestamp: number) => {
            if (game.gameOver) return;

            // Frame rate limiting for consistent speed
            const deltaTime = timestamp - game.lastFrameTime;
            if (deltaTime < 16) { // Cap at ~60fps
                game.animationId = requestAnimationFrame(gameLoop);
                return;
            }
            game.lastFrameTime = timestamp;

            ctx.fillStyle = '#0a0a1a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw stars background
            drawStars();

            // Move player (slower speed)
            const speed = 4;
            if ((game.keys['ArrowLeft'] || game.keys['a'] || game.keys['A']) && game.player.x > 0) {
                game.player.x -= speed;
            }
            if ((game.keys['ArrowRight'] || game.keys['d'] || game.keys['D']) && game.player.x < canvas.width - game.player.width) {
                game.player.x += speed;
            }

            // Auto-fire when holding space (with cooldown)
            if ((game.keys[' '] || game.keys['ArrowUp']) && timestamp - game.lastBulletTime > 200) {
                game.bullets.push({
                    x: game.player.x + game.player.width / 2 - 3,
                    y: game.player.y,
                    width: 6,
                    height: 15,
                });
                game.lastBulletTime = timestamp;
            }

            // Update and draw bullets (slower)
            game.bullets = game.bullets.filter(bullet => {
                bullet.y -= 5;
                if (bullet.y < -bullet.height) return false;
                drawBullet(bullet);
                return true;
            });

            // Spawn enemies (slower spawn rate)
            if (timestamp - game.lastEnemySpawn > Math.max(800, 2000 - game.score * 1.5)) {
                spawnEnemy();
                game.lastEnemySpawn = timestamp;
            }

            // Update and draw enemies
            game.enemies = game.enemies.filter(enemy => {
                enemy.y += enemy.speed;

                // Check collision with player
                if (checkCollision(enemy, game.player)) {
                    game.gameOver = true;
                    setGameOver(true);
                    if (game.score > highScore) {
                        setHighScore(game.score);
                        localStorage.setItem('celestaSpaceHighScore', game.score.toString());
                    }
                    return false;
                }

                // Check collision with bullets
                for (let i = game.bullets.length - 1; i >= 0; i--) {
                    if (checkCollision(enemy, game.bullets[i])) {
                        game.bullets.splice(i, 1);
                        game.score += 10;
                        setScore(game.score);
                        return false;
                    }
                }

                if (enemy.y > canvas.height) {
                    return false;
                }

                drawEnemy(enemy);
                return true;
            });

            // Draw player
            drawPlayer();

            // Draw score
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 20px monospace';
            ctx.fillText(`Score: ${game.score}`, 10, 30);
            ctx.fillText(`High: ${Math.max(highScore, game.score)}`, canvas.width - 120, 30);

            // Draw controls hint
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.font = '12px monospace';
            ctx.fillText('← → or A/D to move | SPACE or ↑ or CLICK to shoot', 10, canvas.height - 10);

            game.animationId = requestAnimationFrame(gameLoop);
        };

        game.animationId = requestAnimationFrame(gameLoop);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            canvas.removeEventListener('click', handleClick);
            if (game.animationId) cancelAnimationFrame(game.animationId);
        };
    }, [highScore, gameKey]);

    const restartGame = () => {
        // Reset game ref state
        const game = gameRef.current;
        if (game.animationId) {
            cancelAnimationFrame(game.animationId);
        }
        game.bullets = [];
        game.enemies = [];
        game.score = 0;
        game.gameOver = false;
        game.lastEnemySpawn = 0;
        game.lastBulletTime = 0;
        game.lastFrameTime = 0;
        game.keys = {};
        
        // Reset React state
        setScore(0);
        setGameOver(false);
        
        // Increment key to force useEffect to re-run and restart game loop
        setGameKey(prev => prev + 1);
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
        >
            <div className="text-center mb-4">
                <h2 className="text-3xl font-bold text-cyan-400 mb-2">🚀 CELESTA DEFENDER</h2>
                <p className="text-gray-400 text-sm">← → or A/D to move • SPACE / ↑ / CLICK to shoot</p>
            </div>
            
            <div className="relative">
                <canvas 
                    ref={canvasRef} 
                    className="border-2 border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-500/20"
                />
                
                {gameOver && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg">
                        <h3 className="text-4xl font-bold text-red-500 mb-4">GAME OVER</h3>
                        <p className="text-2xl text-white mb-2">Score: {score}</p>
                        <p className="text-lg text-cyan-400 mb-6">High Score: {highScore}</p>
                        <button 
                            onClick={restartGame}
                            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-lg transition-colors mb-2"
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>

            <button 
                onClick={onClose} 
                className="mt-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
                Close Game
            </button>
        </motion.div>
    );
};

export default function SponsorsPage() {
    const [showGame, setShowGame] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const pressTimer = useRef<NodeJS.Timeout | null>(null);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [logoTaps, setLogoTaps] = useState(0);

    const [[page, direction], setPage] = useState([0, 0]);



    // Sponsors per page is chosen dynamically
    const maxRows = 3;
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1200
    );

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    let cols = 4;
    if (windowWidth < 500) cols = 1;
    else if (windowWidth < 768) cols = 2;
    else if (windowWidth < 1024) cols = 3;


    const sponsorsPerPage = cols * maxRows;
    const pageCount = Math.ceil(sponsors.length / sponsorsPerPage);
    const gap = 16;
    const containerWidth = windowWidth * 0.8;
    const cardWidth = (containerWidth - gap * (cols - 1)) / cols;
    const rowHeight = cardWidth * 9 / 16;

    const paginate = (newDirection: number) => {
        setPage(prev => [prev[0] + newDirection, newDirection]);
    };

    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        setIsAnimating(true);
        const interval = setInterval(() => paginate(1), 1500);
        setTimeout(() => setIsAnimating(false), 100);
        setTimeout(() => setIsAnimating(true), 150);
        return () => clearInterval(interval);
    }, [page, isPaused]);

    const carouselRef = useRef<HTMLDivElement>(null);
    const isWheeling = useRef(false);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;
        const handleWheel = (event: WheelEvent) => {
            if (isWheeling.current) return;
            event.preventDefault();
            if (Math.abs(event.deltaY) > 1) {
                isWheeling.current = true;
                if (event.deltaY > 0) paginate(1);
                else paginate(-1);
                setTimeout(() => { isWheeling.current = false; }, 800);
            }
        };
        carousel.addEventListener('wheel', handleWheel, { passive: false });
        return () => carousel.removeEventListener('wheel', handleWheel);
    }, []);

    const pageIndex = ((page % pageCount) + pageCount) % pageCount;
    const visibleSponsors = sponsors.slice(pageIndex * sponsorsPerPage, (pageIndex + 1) * sponsorsPerPage);

    const carouselVariants = {
        enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
    };

    const startPressTimer = () => {
        pressTimer.current = setTimeout(() => {
            setShowCelebration(true);
            setTimeout(() => {
                setShowCelebration(false);
                setShowGame(true);
            }, 3000);
            setProgress(0);
        }, 6000);
        setProgress(100);
    };

    const cancelPressTimer = () => {
        if (pressTimer.current) clearTimeout(pressTimer.current);
        setProgress(0);
    };

    useEffect(() => {
        if (logoTaps > 0) {
            const timer = setTimeout(() => setLogoTaps(0), 2000);
            return () => clearTimeout(timer);
        }
    }, [logoTaps]);

    const handleLogoClick = () => {
        const newTaps = logoTaps + 1;
        setLogoTaps(newTaps);
        if (newTaps >= 7) {
            setShowCelebration(true);
            setTimeout(() => {
                setShowCelebration(false);
                setShowGame(true);
            }, 3000);
            setLogoTaps(0);
        } else {
            paginate(1);
        }
    };

    return (
        <div
            className="min-h-screen bg-black text-white relative overflow-hidden font-sans"
            onMouseDown={startPressTimer} onMouseUp={cancelPressTimer} onMouseLeave={cancelPressTimer}
            onTouchStart={startPressTimer} onTouchEnd={cancelPressTimer}
        >
            <div className="fixed inset-0 z-0">
                <img src="/images/events-backdrop.png" alt="Background" className="w-full h-full object-cover opacity-75" />
            </div>
            <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none">
                <motion.div
                    className="h-full bg-cyan-400"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: progress > 0 ? 6 : 0, ease: 'linear' }}
                />
            </div>
            <div className="absolute inset-0 z-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,transparent_65%,white_100%)]">
                <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                    <defs>
                        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="0.5"></path></pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)"></rect>
                </svg>
            </div>
            <div className="container mx-auto px-4 py-24 relative z-10 flex flex-col items-center">
                <motion.h1
                    className="text-5xl md:text-7xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 race uppercase"
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                >
                    SPONSORS
                </motion.h1>
                <motion.p
                    className="text-lg text-center text-gray-400 mb-12 max-w-2xl"
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Fueling innovation and making our events possible.
                </motion.p>
                <div
                    ref={carouselRef}
                    className="relative w-full max-w-8xl flex items-center justify-center"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >

                    {/* Left Arrow */}
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-2 md:left-4 z-20 p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                        style={{ top: "50%", transform: "translateY(-50%)" }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>


                    <div className="relative w-[90vw] overflow-hidden h-[700px] sm:h-[550px] md:h-[500px] lg:h-[600px]">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={page}
                                custom={direction}
                                variants={carouselVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                                className="absolute inset-0 grid gap-4 p-4 md:p-6 lg:px-8"
                                style={{
                                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                                    gridAutoRows: `${rowHeight}px`,
                                    height: '100%',

                                }}
                            >
                                {visibleSponsors.map((sponsor) => (
                                    <div
                                        key={sponsor.name}
                                        className="w-full h-full flex items-center justify-center"
                                    >
                                        <SponsorCard sponsor={sponsor} />
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-2 md:right-4 z-20 p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                        style={{ top: "50%", transform: "translateY(-50%)" }}
                    >
                        <svg
                            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
                <div className="mt-8 flex justify-center">
                    <button onClick={handleLogoClick} className="relative w-16 h-16 flex items-center justify-center">
                        <div className={cn("absolute inset-0 rounded-full bg-cyan-500/20", isAnimating && !isPaused && "animate-ping-slow")}></div>
                        <img src="/images/celesta-icon.png" alt="Celesta Icon" className="w-10 h-10" />
                    </button>
                </div>
                <motion.p
                    className="mt-4 text-xs text-gray-500 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                >
                    Hint: Try a long press on sponsors or tap the logo seven times.
                </motion.p>
            </div>
            <AnimatePresence>
                {showCelebration && <CodingBitsCelebration />}
                {showGame && <SpaceShooterGame onClose={() => setShowGame(false)} />}
            </AnimatePresence>
            <style jsx>{`
                @keyframes ping-slow {
                    0% { transform: scale(1); opacity: 0.75; }
                    75%, 100% { transform: scale(2); opacity: 0; }
                }
                .animate-ping-slow {
                    animation: ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>
        </div>
    );
}