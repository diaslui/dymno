"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Play,
  Users,
  RefreshCw,
  Settings,
  Volume2,
  HelpCircle,
} from "lucide-react";
import Footer from "@/components/ui/footer";
import { Input } from "@/components/ui/input";
import Loader from "@/components/utils/Loader";
import { createRoomRequest } from "@/components/requests/createRoom";
import { generatePlayerId  } from "#/modules/utils/id";

const Home: React.FC = () => {
  const avatars = [
    "/assets/img/avatar/1.jpg",
    "/assets/img/avatar/2.jpg",
    "/assets/img/avatar/3.jpg",
    "/assets/img/avatar/4.jpg",
    "/assets/img/avatar/6.jpg",
  ];

  const [nickname, setNickname] = useState<string>("");
  const [roomCode, setRoomCode] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<string>(avatars[0]);
  const [avatarIndex, setAvatarIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true); 
  const [loaderText, setLoaderText] = useState<string>("");

  useEffect(() => {
    const savedNickname = localStorage.getItem("nickname");
    const savedAvatar = localStorage.getItem("avatar");

    if (savedNickname) setNickname(savedNickname);
    if (savedAvatar) {
      setSelectedAvatar(savedAvatar);
      setAvatarIndex(avatars.indexOf(savedAvatar));
    }


    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  useEffect(() => {
    if (nickname.length > 20) setNickname(nickname.slice(0, 20));
    if (nickname) localStorage.setItem("nickname", nickname);
  }, [nickname]);

  const changeAvatar = () => {
    const nextIndex = (avatarIndex + 1) % avatars.length;
    setAvatarIndex(nextIndex);
    const newAvatar = avatars[nextIndex];
    setSelectedAvatar(newAvatar);
    localStorage.setItem("avatar", newAvatar);
  };
  
  const createRoom = () => {
    setLoaderText("Opa, estamos criando a sala para você...");
    setLoading(true);

    const owner = {
      id: generatePlayerId(),
      nickname,
      photoId: selectedAvatar,
    };

    createRoomRequest(owner).then((response) => {
      if (response) {
        console.log(response);
      } else {
        console.log("Erro ao criar a sala.");
      }
      setLoading(false);
    });
  
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/assets/img/bg.jpg')" }}
    >

      {loading && <Loader loaderText={loaderText} />}
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
          <div className="bg-white bg-opacity-95 backdrop-blur-xl border-2 border-yellow-500 rounded-3xl shadow-2xl p-8 max-w-md w-full transition-all duration-300 hover:shadow-indigo-600/50">

            <div className="mb-8 flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold mb-4 text-indigo-600">
                Escolha um Avatar e um Nickname
              </h3>
              <div className="relative w-32 h-32 mb-2">
                <Image
                  src={selectedAvatar}
                  alt="Avatar"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-4 border-indigo-500"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-0 right-0 bg-indigo-500 text-white hover:bg-indigo-600 rounded-full p-2"
                  onClick={changeAvatar}
                >
                  <RefreshCw className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {nickname ? "Legal, " + nickname : ""}{" "}
              </p>

              <Input
                id="nickname"
                type="text"
                maxLength={20}
                placeholder="NicknameMassa123"
                autoComplete="off"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="mt-2 text-center"
              />
              <Button className="w-full mt-4 mb-2 text-lg py-4 " onClick={createRoom} size="lg">
                <Play className="mr-2 h-5 w-5" /> Criar Sala
              </Button>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4">
                Entrar em uma sala
              </h2>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  maxLength={12}
                  placeholder="Link ou código da sala"
                  autoComplete="off"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  className="flex-grow"
                />
                <Button variant="secondary" size="lg">
                  <Users className="mr-2 h-5 w-5" /> Entrar
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
