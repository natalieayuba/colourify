import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { Button, Palette, SegmentedControl, Switch } from "../components";
import { Field } from "../components/Field";
import { getCurrentUser } from "../hooks/useSpotifyAPI";

const timeRanges = [
  {
    id: "short_term",
    value: "Last month",
  },
  {
    id: "medium_term",
    value: "Last 6 months",
  },
  { id: "long_term", value: "All time" },
];

export const Download = () => {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showAlbumName, setShowAlbumName] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedTimeRange, setSelectedTimeRange] = useState("short_term");
  const [controller, setController] = useState(new AbortController());
  const paletteRef = useRef<HTMLDivElement>(null);
  const loading = progress < 1;

  useEffect(() => {
    const fetchData = async () =>
      await getCurrentUser().then((response) => {
        setUsername(response.data.display_name);
        setDisplayName(response.data.display_name);
      });
    fetchData();
  }, []);

  const updateTimeRange = (timeRange: string) => {
    if (timeRange !== selectedTimeRange) {
      controller.abort();
      setController(new AbortController());
      setSelectedTimeRange(timeRange);
    }
  };

  const toggleShowAlbumName = () => setShowAlbumName(!showAlbumName);

  const downloadPaletteImage = async () => {
    html2canvas(paletteRef.current?.parentElement as HTMLElement, {
      allowTaint: true,
      useCORS: true,
      scale: 2 * window.devicePixelRatio,
    }).then((canvas) => {
      var link = document.createElement("a");
      link.download = `${username.toLowerCase()}_colourify_palette_${selectedTimeRange}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-20 py-10 sm:pt-24">
      <div className="mb-[-1344px] mr-[-756px] origin-top-left scale-[0.3] shadow-[0_4px_30px_0px_rgba(0,0,0,0.05)] sm:mb-[-960px] sm:mr-[-540px] sm:scale-50">
        <Palette
          displayName={displayName}
          ref={paletteRef}
          loading={loading}
          showAlbumName={showAlbumName}
          setProgress={setProgress}
          progress={progress}
          selectedTimeRange={selectedTimeRange}
          controller={controller}
        />
      </div>
      <form className="w-[324px] space-y-8 sm:w-[520px]">
        <h2 className="text-3xl font-semibold sm:text-4xl">Customise</h2>
        <Field
          label="Edit display name"
          name="username"
          defaultValue={username}
          value={displayName}
          setValue={setDisplayName}
          endContent={
            <button
              onClick={() => setDisplayName(username)}
              title="Reset to Spotify username"
            >
              &#8634;
            </button>
          }
        />
        <SegmentedControl
          label="Show top albums from"
          name="timeRange"
          selected={selectedTimeRange}
          onSelect={updateTimeRange}
          items={timeRanges}
        />
        <Switch
          disabled={loading}
          label="Include artist and album name"
          name="showAlbumName"
          onClick={toggleShowAlbumName}
        />
        <Button
          id="download-btn"
          className="mt-12 w-full"
          onClick={downloadPaletteImage}
          disabled={loading}
          icon={<span className="text-2xl">⭳</span>}
          type="button"
        >
          Download image
        </Button>
      </form>
    </div>
  );
};
