import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter";
}

export function Card(props: CardProps) {
  return (
    <div className="p-4 max-w-72 bg-white rounded-md shadow-md border border-gray-200 min-w-72 max-h-80 overflow-y-hidden">
      {/* top section */}
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <div className="pr-2 text-gray-500">
            <ShareIcon size="md" />
          </div>
          {props.title}
        </div>
        <div className="flex items-center">
          <div className="pr-2 text-gray-500">
            <a href={props.link} target="_blank">
              <ShareIcon size="md" />
            </a>
          </div>
          <div className="text-gray-500">
            <ShareIcon size="md" />
          </div>
        </div>
      </div>

      {/* video/external embedding */}
      <div className="pt-4 ">
        {props.type === "youtube" && (
          <iframe
            className="w-full"
            src={props.link.replace(
              "https://youtu.be/",
              "https://www.youtube.com/embed/"
            )}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {props.type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={props.link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
