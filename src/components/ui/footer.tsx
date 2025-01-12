"use client";
import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Heart } from "lucide-react";
import { GiAnarchy } from "react-icons/gi";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-sky-700 via-indigo-700 to-rose-600  text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Image
              src="/assets/img/w-dylogo.svg"
              alt="Dymno Logo"
              width={200}
              height={40}
              className="h-10"
            />

            <p className="text-indigo-200">
              Jogue jogos com Amigos ou conheça novas pessoas em diversos jogos
              na Dymno.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Acesso Rápido</h3>
            <ul className="space-y-2">
              {[
                { label: "Como Jogar", url: "/como-jogar" },
                { label: "Ranking", url: "/ranking" },
              ].map(({ label, url }) => (
                <li key={label}>
                  <a
                    href={url}
                    className="hover:text-yellow-300 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre Dymno</h3>
            <ul className="space-y-2">
              {[
                { label: "FAQ", url: "/faq" },
                { label: "Termos de Uso", url: "/termos-de-uso" },
                { label: "Contato", url: "/contact" },
                { label: "Manifesto", url: "/manifest" },
              ].map(({ label, url }) => (
                <li key={label}>
                  <a
                    href={url}
                    className="hover:text-yellow-300 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-indigo-700 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {[
              {
                Icon: Facebook,
                label: "Facebook",
                url: "https://facebook.com",
              },
              { Icon: Twitter, label: "Twitter", url: "https://twitter.com" },
              {
                Icon: Instagram,
                label: "Instagram",
                url: "https://instagram.com",
              },
              { Icon: Youtube, label: "YouTube", url: "https://youtube.com" },
            ].map(({ Icon, label, url }) => (
              <a
                key={label}
                href={url}
                className="text-indigo-200 hover:text-yellow-300 transition-colors"
                aria-label={label}
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </div>

          <GiAnarchy size={40} />
        </div>

        <div className="mt-8 text-center text-indigo-200">
          <p>
            &copy; {new Date().getFullYear()} Dymno. Todos os direitos
            reservados.
          </p>
          <p className="mt-2 flex items-center font-bold justify-center">
            Feito com <Heart className="h-4 w-4 mx-1 text-red-500" /> no Brasil
          </p>

          <p className="mt-2 flex items-center justify-center">
            Criado por -{" "}
            <a
              href="https://github.com/luiisp"
              className="hover:text-yellow-300 font-bold transition-colors"
            >
              Lui
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
