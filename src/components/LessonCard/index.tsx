import { format, isPast } from "date-fns";
import { CheckCircle } from "phosphor-react";
import { Link, useParams } from "react-router-dom";

interface LessonProps {
  title: string;
  type: 'live' | 'class';
  lessonSlug: string;
  availableAt: Date;
}

export const LessonCard = ({ title, type, lessonSlug, availableAt }: LessonProps) => {
  const { slug } = useParams<{ slug: string }>()
  
  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(availableAt, "EEEE k'h'mm MMMM dd");

  const isLessonActive = slug === lessonSlug;

  return (
    <Link to={`/event/lesson/${lessonSlug}`}>
      <span className="text-gray-300">{availableDateFormatted}</span>
      <div className={`rounded border border-gray-500 p-4 mt-2 hover:scale-105 hover:border-green-500 duration-300 ${isLessonActive && 'bg-green-500'}`}>
        <header className="flex items-center justify-between">
          { isLessonAvailable ? 
            <span className={`text-sm font-medium flex items-center gap-2 ${isLessonActive ? 'text-white' : 'text-blue-500 '}`}>
              <CheckCircle size={20} />
              Released content
            </span> :
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <CheckCircle size={20} />
              Upcoming content
          </span>
          }
          
          <span className={`text-xs rounded px-2 py-[0.125rem] text-white border font-bold ${isLessonActive ? 'border-white' : 'border-green-300'}`}>
            {type === 'live' ? 'Live' : 'Recorded'}
          </span>
        </header>
        <strong className={`mt-5 block ${isLessonActive ? 'text-white' : 'text-gray-200'}`}>
          {title}
        </strong>
      </div>
    </Link>
  )
}