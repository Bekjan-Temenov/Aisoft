"use client";
import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import botle from "../assets/images-removebg-preview.svg";
import { FaPlus, FaMinus, FaCheck } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

export default function WaterPouringGame() {
  const [vesselVolume, setVesselVolume] = useState(10000);
  const [objectVolume, setObjectVolume] = useState<number>(1000);
  const [filled, setFilled] = useState(0);
  const [pourCount, setPourCount] = useState(0);
  const [pouring, setPouring] = useState(false);
  const [bottleWater, setBottleWater] = useState(objectVolume);
  const [count, setCount] = useState(0);

  const playSound = () => {
    const audio = new Audio("/audio.mp3");
    audio.play();
  };

  const successSound = () => {
    const audio = new Audio(
      "/trumpet-fanfare-success-epic-stock-media-1-00-02.mp3"
    );
    audio.play();
  };
  const wrongSound = () => {
    const audio = new Audio("/mixkit-wrong-answer-fail-notification-946.wav");
    audio.play();
  };

  console.log(bottleWater);
  useEffect(() => {
    setVesselVolume(vesselVolume);
    setObjectVolume(objectVolume);
    setBottleWater(objectVolume);
  }, [vesselVolume, objectVolume]);

  const pourWater = () => {
    setPouring(true);
    playSound();
    setTimeout(() => {
      setFilled((prev) => prev + objectVolume);
      setPourCount((prev) => prev + 1);
      setCount((prev) => prev + objectVolume);
      setPouring(false);
      setBottleWater(0);
      setTimeout(() => {
        setBottleWater(objectVolume);
      }, 1000);
    }, 1000);
  };

  const removeWater = () => {
    playSound();
    if (filled - objectVolume >= 0) {
      setFilled(filled - objectVolume);
      setPourCount(pourCount - 1);
      setCount(count - objectVolume);
    }
  };

  const checkAnswer = () => {
    playSound();
    if (filled === vesselVolume) {
      successSound();
      toast.success("Поздравляем! Вы правильно заполнили сосуд!");
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } else {
      wrongSound();
      toast.error("Попробуйте снова, количество воды не совпадает.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 p-4 text-center">
      <Toaster />
      <h1 className="text-3xl font-bold text-white mb-6">
        Заполни сосуд водой
      </h1>
      <div className="flex  sm:flex-row items-center md:mb-[80px] mb-[50px] lg:mb-[100px] justify-center gap-4">
        <select
          value={objectVolume}
          onChange={(e) => setObjectVolume(Number(e.target.value))}
          onClick={playSound}
          className="p-2 rounded-lg cursor-pointer w-[150px] shadow-lg bg-white"
        >
          <option className="hover:bg-blue-500" value="5000">
            5 л
          </option>
          <option className="hover:bg-blue-500" value="1000">
            1 л
          </option>
          <option className="hover:bg-blue-500" value="500">
            500 мл
          </option>
          <option className="hover:bg-blue-500" value="250">
            250 мл
          </option>
        </select>
        <select
          value={vesselVolume}
          onClick={playSound}
          onChange={(e) => setVesselVolume(Number(e.target.value))}
          className="p-2 rounded-lg cursor-pointer  w-[150px] shadow-lg bg-white"
        >
          <option className="hover:bg-blue-500" value="2000">
            2 л
          </option>
          <option className="hover:bg-blue-500" value="5000">
            5 л
          </option>
          <option className="hover:bg-blue-500" value="10000">
            10 л
          </option>
        </select>
      </div>
      <div className="relative flex items-end gap-10 mt-6 ">
        <motion.div
          animate={{
            x: pouring ? 50 : 0,
            y: pouring ? -190 : 0,
            rotate: pouring ? 45 : 0,
          }}
          transition={{
            x: { duration: 0.5 },
            y: { duration: 0.5 },
            rotate: { delay: 0.5, duration: 0.5 },
          }}
          className="relative  w-20 h-[205px] z-50 overflow-hidden   flex items-end justify-center  "
        >
          <p className="text-black font-[700] text-lg absolute top-4 my-auto z-50 h-full text-center flex items-center justify-center">
            {bottleWater / 1000} л
          </p>
          <img className="h-auto  absolute z-40" src={botle.src} alt="icon" />

          <motion.div
            className="absolute bottom-0 mt-[50px] rounded-t-[23px] rounded-b-[12px] z-10 w-full bg-blue-500"
            animate={{
              height: `${(bottleWater / 1000) * 80}% `,
              maxHeight: "160px",
              width: "88%",
              marginBottom: "4px",
            }}
            transition={{ duration: 1 }}
          />
        </motion.div>
        <div className="relative w-40 h-64 border-4 border-white bg-white rounded-t-lg overflow-hidden">
          <p className="absolute inset-0 flex z-50 items-center justify-center text-xl font-bold text-black">
            {vesselVolume / 1000} л
          </p>
          <motion.div
            className="absolute bottom-0 w-full bg-blue-500"
            animate={{ height: `${(filled / vesselVolume) * 100}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between  gap-[100px]  mt-6 text-black font-[700] text-lg">
        <p>Наливаний: {pourCount}</p>
        <p>Воды: {count / 1000} л</p>
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={pourWater}
          className="p-3 bg-blue-600 text-white rounded-lg shadow-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <FaPlus /> Вылить {objectVolume} л
        </button>
        <button
          onClick={removeWater}
          className="p-3 bg-red-600 text-white rounded-lg shadow-lg flex items-center gap-2 hover:bg-red-700"
        >
          <FaMinus /> Убрать {objectVolume} л
        </button>
      </div>
      <button
        onClick={checkAnswer}
        className="mt-6 p-3 bg-green-600 text-white rounded-lg shadow-lg flex items-center gap-2 hover:bg-green-700"
      >
        <FaCheck /> Проверить
      </button>
    </div>
  );
}
