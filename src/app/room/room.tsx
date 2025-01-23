"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Copy,
  Users,
  Settings,
  Volume2,
  HelpCircle,
  Crown,
  ChevronDown,
} from "lucide-react";
import Footer from "@/components/ui/footer";
import "@/app/globals.css";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRooms } from "#/modules/core/storage";
import { Room } from "#/modules/core/types";
import { useRouter } from "next/navigation";
import {validateRoomRequest} from "@/components/requests/validateRoom";
import GameModeSelector from "@/components/gameModeSeletor";
import {io} from "socket.io-client"


const RoomPage: React.FC = (
  { room }: { room: Room  }
) => {

  const [playerCount, setPlayerCount] = useState<number>(4);
  const [gameMode, setGameMode] = useState<string>("classic");
  const [invalidRoom, setInvalidRoom] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<Room | null>(null);
  const [players, setPlayers] = useState<Room["members"]>([]);


  const router = useRouter();
 

  useEffect(() => {
    console.log("Inside Room ->", room)
    if (!room){
      return; 
    }

    const { id } = room;
    validateRoomRequest(id).then((room) => {
      
  
  
      
      if (!id || typeof id !== "string" || !room) {
        return (
          setInvalidRoom(true)
        );
      }
  
      setRoomData(room);

      const socket = io("https://192.168.0.136:3000");

      socket.on(
        "connect", () => {


          console.log("connected")

        }

      )

      socket.on(
        "disconnect", () => {
          console.log("disconnected")
        }
      )
    
  
  
  
  
  
  
    });








  }, []);

  const playersMock = [
    {
      id: 1,
      name: "Player 1",
      avatar: "/assets/img/avatar/1.jpg",
      isHost: true,
    },
    {
      id: 2,
      name: "Player 2",
      avatar: "/assets/img/avatar/2.jpg",
      isHost: false,
    },
    {
      id: 3,
      name: "Player 3",
      avatar: "/assets/img/avatar/3.jpg",
      isHost: false,
    },
   
  ];

  const copyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href+`?room=${room.id}`);
  };





  return (
<>
    {

      invalidRoom ?
      (
        <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            Sala não encontrada
          </h1>
          <p className="text-lg text-indigo-600 mb-4">
            A sala que você está tentando acessar não existe.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Voltar para a página inicial
          </Button>
        </div>
      </div>

      ) : (

        <div
        className="relative min-h-screen bg-cover bg-center flex flex-col"
        style={{ backgroundImage: "url('/assets/img/bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-indigo-700 bg-opacity-80"></div>
  
        <div className="relative z-10 flex flex-col min-h-screen">
          <header className="p-4 flex justify-between items-center">
            <Image
              src="/assets/img/dylogo.svg"
              alt="Dymno Logo"
              height={200}
              width={200}
            />
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-indigo-200"
              >
                <Settings className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-indigo-200"
              >
                <Volume2 className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-indigo-200"
              >
                <HelpCircle className="h-6 w-6" />
              </Button>
            </div>
          </header>
  
          <main className="flex-grow flex items-center justify-center p-4">
            <div className="bg-white bg-opacity-95 backdrop-blur-xl border border-indigo-300 rounded-3xl shadow-2xl p-8 max-w-4xl w-full transition-all duration-300 hover:shadow-indigo-300/50">
              <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
                Sala de Jogo
              </h1>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                    Jogadores
                  </h2>
                  <div className="space-y-4">
                    {players.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center space-x-4"
                      >
                        <div className="relative w-12 h-12">
                          <Image
                            src={player.avatar}
                            alt={player.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full border-2 border-indigo-500"
                          />
                          {player.isHost && (
                            <Crown className="absolute -top-1 -right-1 h-5 w-5 text-yellow-400" />
                          )}
                        </div>
                        <span className="text-lg font-medium text-indigo-700">
                          {player.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
  
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                      Configurações da Sala
                    </h2>
                    <div className="flex items-center space-x-4 mb-4">
                      <Button
                        onClick={copyRoomLink}
                        className="font-medium w-full"
                      >
                        <Copy className="mr-4 h-4 w-4" /> Copiar Link de convite
                      </Button>
                    </div>
                  </div>
  
                  <div>
                    <h3 className="text-lg font-medium text-indigo-600 mb-2">
                      Número de Jogadores
                    </h3>
                    <div className="flex items-center space-x-4">
                      <Slider
                        value={[playerCount]}
                        onValueChange={(value) => setPlayerCount(value[0])}
                        max={10}
                        min={2}
                        step={1}
                        className="flex-grow"
                      />
                      <span className="text-lg font-black  text-indigo-700">
                        {playerCount}
                      </span>
                    </div>
                  </div>
  
                  <div>
                    <h3 className="text-lg font-medium text-indigo-600 mb-2">
                      Modo de Jogo
                    </h3>
                    <GameModeSelector
                      selectedMode={gameMode}
                      onModeChange={setGameMode}/>
                  </div>
  
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-3 mt-4">
                    Iniciar Jogo
                  </Button>
                </div>
              </div>
            </div>
          </main>
  
          <Footer />
        </div>
      </div>
      )
    }

</>
  );
};

export default RoomPage;
