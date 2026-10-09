import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Dumbbell,
  Clock3,
  Target,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import {
  fetchPrimeMoverMuscles,
  fetchMealsByCategory,
  fetchExerciseById,
  BEGINNER_LEVEL_ID,
} from "@/features/class/api/class";

const MUSCLE_GROUP_IDS = ["69d982ed85f6bfa972bf2218"];

function getYouTubeId(url?: string | null) {
  if (!url) return null;

  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&/]+)/,
  );

  return match?.[1] ?? null;
}

function getYouTubeThumbnail(url?: string | null) {
  const id = getYouTubeId(url);

  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export default function ClassDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeLevel, setActiveLevel] = useState("Beginner");

  // Load the exercise selected by its ID.
  const {
    data: selectedExercise,
    isLoading: isExerciseLoading,
    isError: isExerciseError,
  } = useQuery({
    queryKey: ["class-details", id],
    queryFn: () => fetchExerciseById(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 10,
  });

  // Load exercises for the sidebar and recommendations.
  const {
    data: exercises = [],
    isLoading: isExercisesLoading,
    isError: isExercisesError,
  } = useQuery({
    queryKey: ["class-details-exercises"],
    queryFn: async () => {
      const muscles = await Promise.all(
        MUSCLE_GROUP_IDS.map((groupId) =>
          fetchPrimeMoverMuscles(groupId),
        ),
      );

      const allMuscles = muscles.flat();

      const results = await Promise.all(
        allMuscles.map((muscle) =>
          fetchMealsByCategory(muscle._id, BEGINNER_LEVEL_ID),
        ),
      );

      return results.flat();
    },
    staleTime: 1000 * 60 * 10,
  });

  const recommendations = useMemo(() => {
    const availableExercises = exercises.filter(
      (exercise) => exercise._id !== id,
    );

    if (
      selectedExercise &&
      !availableExercises.some(
        (exercise) => exercise._id === selectedExercise._id,
      )
    ) {
      return [selectedExercise, ...availableExercises].slice(0, 4);
    }

    return availableExercises.slice(0, 4);
  }, [exercises, id, selectedExercise]);

  const videoUrl =
    selectedExercise?.short_youtube_demonstration_link;

  const levels = ["Beginner", "Intermediate", "Advanced"];

  const filteredExercises = exercises.filter((exercise) => {
    const level = exercise.difficulty_level.toLowerCase();

    if (activeLevel === "Beginner") {
      return level === "beginner" || level === "مبتدئ";
    }

    if (activeLevel === "Intermediate") {
      return (
        level === "intermediate" ||
        level === "متوسط" ||
        level === "متوسط المستوى"
      );
    }

    return level === "advanced" || level === "متقدم";
  });

  if (isExerciseLoading) {
    return (
      <main className="min-h-screen bg-[#101010] p-8 text-white">
        Loading exercise details...
      </main>
    );
  }

  if (isExerciseError || !selectedExercise) {
    return (
      <main className="min-h-screen bg-[#101010] p-8 text-white">
        <button
          type="button"
          onClick={() => navigate("/classes")}
          className="mb-6 flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Classes
        </button>

        <div className="rounded-2xl border border-white/10 bg-[#181818] p-8">
          <h1 className="text-2xl font-bold">
            Unable to load exercise
          </h1>

          <p className="mt-2 text-white/60">
            We couldn't find this exercise. Please check the exercise
            ID or the API endpoint.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#101010] px-4 py-8 text-white sm:px-8">
      <button
        type="button"
        onClick={() => navigate("/classes")}
        className="mb-6 flex items-center gap-2 text-sm text-white/70 hover:text-white"
      >
        <ArrowLeft size={18} />
        Back to Classes
      </button>

      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-white/10 bg-[#181818] p-4">
          <h2 className="mb-4 text-xl font-bold">Exercises</h2>

          <div className="mb-4 flex flex-wrap gap-2">
            {levels.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setActiveLevel(level)}
                className={`rounded-full px-3 py-2 text-xs font-semibold ${
                  activeLevel === level
                    ? "bg-orange-500 text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {isExercisesLoading ? (
            <p className="py-4 text-sm text-white/50">
              Loading exercises...
            </p>
          ) : isExercisesError ? (
            <p className="py-4 text-sm text-red-400">
              Failed to load the exercise list.
            </p>
          ) : (
            <div className="max-h-[600px] space-y-2 overflow-y-auto">
              {filteredExercises.map((exercise) => (
                <button
                  key={exercise._id}
                  type="button"
                  onClick={() =>
                    navigate(`/classes/${exercise._id}`)
                  }
                  className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition ${
                    exercise._id === id
                      ? "bg-orange-500/15 ring-1 ring-orange-500"
                      : "hover:bg-white/5"
                  }`}
                >
                  <img
                    src={
                      getYouTubeThumbnail(
                        exercise.short_youtube_demonstration_link,
                      ) ??
                      "https://placehold.co/100x75/222/fff?text=Exercise"
                    }
                    alt=""
                    className="h-16 w-20 rounded-lg object-cover"
                  />

                  <span className="min-w-0 flex-1 text-sm font-medium">
                    {exercise.exercise}
                  </span>

                  <Play
                    size={16}
                    className="shrink-0 text-orange-400"
                  />
                </button>
              ))}

              {filteredExercises.length === 0 && (
                <p className="py-4 text-sm text-white/50">
                  No exercises found for this level.
                </p>
              )}
            </div>
          )}
        </aside>

        <section className="min-w-0 space-y-6">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#181818]">
            <div className="relative aspect-video bg-black">
              
                
              

      <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-black">
  {videoUrl && getYouTubeId(videoUrl) ? (
    <iframe
      src={`https://www.youtube.com/embed/${getYouTubeId(videoUrl)}?autoplay=1`}
      title={selectedExercise.exercise}
      className="absolute inset-0 h-full w-full"
      allow="autoplay; encrypted-media; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  ) : (
    <div className="flex h-full items-center justify-center text-white/50">
      Video unavailable
    </div>
  )}
</div>
            </div>

            <div className="space-y-5 p-5 sm:p-7">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-400">
                  Exercise Details
                </p>

                <h1 className="text-2xl font-bold sm:text-3xl">
                  {selectedExercise.exercise}
                </h1>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Info
                  icon={<Target size={18} />}
                  label="Target muscle"
                  value={selectedExercise.target_muscle_group}
                />

                <Info
                  icon={<Dumbbell size={18} />}
                  label="Equipment"
                  value={selectedExercise.primary_equipment}
                />

                <Info
                  icon={<Clock3 size={18} />}
                  label="Difficulty"
                  value={selectedExercise.difficulty_level}
                />

                <Info
                  icon={<Target size={18} />}
                  label="Prime mover"
                  value={selectedExercise.prime_mover_muscle}
                />
              </div>

              {selectedExercise.in_depth_youtube_explanation_link && (
                <a
                  href={
                    selectedExercise.in_depth_youtube_explanation_link
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-orange-500 px-5 py-3 text-sm font-semibold text-orange-400 transition hover:bg-orange-500 hover:text-white"
                >
                  <Play size={17} />
                  Watch full explanation
                </a>
              )}
            </div>
          </div>

          <section>
            <h2 className="mb-4 text-xl font-bold">
              Recommendation For You
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {recommendations.map((exercise) => (
                <button
                  key={exercise._id}
                  type="button"
                  onClick={() =>
                    navigate(`/classes/${exercise._id}`)
                  }
                  className="overflow-hidden rounded-xl border border-white/10 bg-[#181818] text-left transition hover:-translate-y-1 hover:border-orange-500/60"
                >
                  <img
                    src={
                      getYouTubeThumbnail(
                        exercise.short_youtube_demonstration_link,
                      ) ??
                      "https://placehold.co/400x225/222/fff?text=Exercise"
                    }
                    alt={exercise.exercise}
                    className="aspect-video w-full object-cover"
                  />

                  <div className="p-3">
                    <h3 className="line-clamp-2 font-semibold">
                      {exercise.exercise}
                    </h3>

                    <p className="mt-2 text-xs text-white/50">
                      {exercise.difficulty_level}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white/5 p-4">
      <span className="mt-0.5 text-orange-400">{icon}</span>

      <div className="min-w-0">
        <p className="text-xs text-white/50">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}