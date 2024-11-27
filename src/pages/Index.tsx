import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { ChevronRight, Plus } from "lucide-react";

const Index = () => {
  const today = new Date();
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return {
      day: date.getDate(),
      isToday: i === 0,
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Hi, User</h1>
            <p className="text-gray-500 text-sm">Let's make habits together!</p>
          </div>
          <button className="text-2xl">🤓</button>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Today</div>
          <button className="text-sm text-gray-500">Clubs</button>
        </div>

        <div className="flex justify-between gap-2">
          {weekDays.map(({ day, isToday }) => (
            <button
              key={day}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isToday
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 border border-gray-100"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <Card className="bg-primary text-white p-4 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 rounded-full p-2">
              <div className="w-6 h-6 rounded-full border-4 border-white" />
            </div>
            <div>
              <p className="font-medium">Your daily goals almost done!</p>
              <p className="text-sm text-white/80">4/5 completed</p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Challenges</h2>
            <button className="text-primary text-sm">VIEW ALL</button>
          </div>

          <Card className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🏃‍♂️</span>
              <div>
                <p className="font-medium">Best Runner!</p>
                <p className="text-sm text-gray-500">About 13 hours left</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" />
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Habits</h2>
            <button className="text-primary text-sm">VIEW ALL</button>
          </div>

          <div className="space-y-3">
            <Card className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">💧</span>
                <p className="font-medium">Drink the water</p>
              </div>
              <Plus className="text-gray-400" />
            </Card>

            <Card className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">🚶‍♂️</span>
                <p className="font-medium">Walk</p>
              </div>
              <Plus className="text-gray-400" />
            </Card>

            <Card className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">🌱</span>
                <p className="font-medium">Water Plants</p>
              </div>
              <Plus className="text-gray-400" />
            </Card>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Index;