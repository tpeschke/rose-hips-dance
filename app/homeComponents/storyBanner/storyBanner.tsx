import "./storyBanner.css";
import { mhiora, lemonade } from "../../utilities/fonts";

export default function StoryBanner() {
  return (
    <div className="story-banner-shell">
      <div id="story-banner" className="story-banner">
        <div>
          <div className="instructor-image"></div>
          <div className="studio-image"></div>
        </div>
        <div>
          <p className="strike-right">Our Philosophy</p>
          <h1 className={`${mhiora.className} antialiased`}>
            Dance is a medicine for the{" "}
            <span className="italic">whole self</span>
          </h1>
          <p className="subtitle">
            Rose Hips Dance was born from a deep belief that movement heals.
            Rooted in the ancient art of belly dance, one of the world's oldest
            healing traditions, our practice gently restores mobility, rebuilds
            confidence, and reconnects you with the profound wisdom your body
            holds.
          </p>
          <p className="subtitle">
            Whether you're recovering from injury, navigating life's
            transitions, or simply longing to feel alive in your body again, you
            belong here.
          </p>
          <button className={`${lemonade.className} antialiased gold`}>
            Our Story
          </button>
        </div>
      </div>
    </div>
  );

  // bottom has the scrolling marquee
}
