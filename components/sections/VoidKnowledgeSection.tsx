"use client";

import React from "react";
import { Microscope, Atom, Thermometer } from "lucide-react";
import VoidItem from "./VoidItem";

const VoidKnowledgeSection: React.FC = () => {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto space-y-48">
        <VoidItem
          title="The Great Nothing"
          description="The Boötes Void is a spherical region of space approximately 330 million light-years in diameter. It contains fewer than 60 galaxies. If our galaxy were in its center, we wouldn't have known about other galaxies until the 1960s."
          icon={Microscope}
          subtitle="Anomaly Detected"
          visualMode="bootes"
          visualLabel="Simulating: Galaxy Deprivation"
          reverse={false}
        />

        <VoidItem
          title="Vacuum Energy"
          description="Empty space is not truly empty. It is seething with quantum fields where virtual particles pop in and out of existence. This 'zero-point energy' suggests that even the absolute void contains infinite potential power."
          icon={Atom}
          subtitle="Quantum State"
          visualMode="quantum"
          visualLabel="Fluctuation: Active"
          visualLabelColor="text-emerald-500/60 blink"
          reverse={true}
        />

        <VoidItem
          title="The Cold Spot"
          description="A region of the sky significantly colder than the Cosmic Microwave Background radiation average. It spans a billion light-years and may be the largest structure known to humanity—a supervoid draining energy from light itself."
          icon={Thermometer}
          subtitle="CMB Anomaly"
          visualMode="coldspot"
          visualLabel="-0.00015 K Deviation"
          visualLabelColor="text-blue-200/40"
          reverse={false}
        />
      </div>
    </section>
  );
};

export default VoidKnowledgeSection;
