
export interface BlueprintStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BlueprintResource {
  title: string;
  type: string;
  id?: string;
  url?: string;
}

export interface BlueprintCycle {
  id: string;
  key: string;
  title: string;
  theme: string;
  svgSchematic: string;
  make: {
    dailyGoal: string;
    description: string;
    materials: string[];
    steps: BlueprintStep[];
    resources: BlueprintResource[];
    challenge?: {
      title: string;
      description: string;
      requirements: string[];
    };
  };
  thynk: {
    concepts: { title: string; description: string; icon: string }[];
    explanation: { title: string; text: string };
    deepDive: {
      heading: string;
      whyItMatters: string;
      realWorldApplication: string;
      logicExploration: string;
    };
    quiz: { id: number; question: string; options: string[]; answer: number }[];
  };
  tweak: {
    intro: string;
    options: { id: string; title: string; description: string; icon: string }[];
  };
  test: {
    intro: string;
    methods: { title: string; description: string; icon: string }[];
  };
  teacherSupport: {
    outcomes: { cat: string; outcome: string; method: string }[];
    vocab: { t: string; d: string }[];
    pedagogy: { title: string; icon: string; subtitle: string; strategy: string; focus: string; action: string }[];
    rubric: { criteria: string; dev: string; prof: string; adv: string }[];
    misconceptions: { error: string; fix: string }[];
    checklist: string[];
    narrative: {
      story: string;
      what: string;
      howPhysical: string;
      howRobotics: string;
      howLogic: string;
      mission: string;
    };
  };
}

export interface Blueprint {
  unit: {
    id: string;
    yearGroup: number;
    title: string;
    description: string;
    thynkLink: {
      context: string;
      mission: string;
    };
  };
  security: {
    schoolName: string;
    appPassword: string;
    chatbotPassword: string;
    aiBudgetLimit: number;
  };
  cycles: BlueprintCycle[];
}

export const blueprint: Blueprint = {
  unit: {
    id: "year-5-air-raid-defense",
    yearGroup: 5,
    title: "Air Raid Defense Systems",
    description: "Designing protective structures and automated early warning systems using structural engineering and Spike Prime sensor logic.",
    thynkLink: {
      context: "In Year 5, we are learning about how World War 2 changed our communities. Safety was paramount. In this unit, we will explore 1940s defense systems and create our own automated early warning network to protect our town.",
      mission: "You are the Defense Engineers! You must build a stable Watchtower, an Early Warning Sensor, and an Automated Anderson Shelter door using Spike Prime hardware."
    }
  },
  security: {
    schoolName: "ThynkLab Defense Academy",
    appPassword: "thynk",
    chatbotPassword: "radar-pulse",
    aiBudgetLimit: 60.00
  },
  cycles: [
    {
      id: "y5-c1",
      key: "CYCLE 1",
      title: "The Watchtower",
      theme: "Structural Stability",
      svgSchematic: `<svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="450" fill="#F1F5F9"/><path d="M300 400 L500 400 L450 100 L350 100 Z" stroke="#1E293B" stroke-width="8"/><path d="M300 400 L450 250 M500 400 L350 250 M350 250 L450 100 M450 250 L350 100" stroke="#7C3AED" stroke-width="4" stroke-dasharray="8 4"/><rect x="360" y="80" width="80" height="40" rx="4" fill="#FACC15" stroke="#1E293B" stroke-width="2"/><circle cx="380" cy="100" r="5" fill="#334155"/><circle cx="420" cy="100" r="5" fill="#334155"/><text x="400" y="60" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="22" fill="#1E293B">SPIKE PRIME HUB TOWER</text></svg>`,
      make: {
        dailyGoal: "Build a stable, 40cm tall watchtower using triangulation to house a Spike Prime Hub and Sensor.",
        description: "Focus on creating a strong 'Wide Base' and internal bracing using triangles to support the yellow Spike Hub.",
        materials: ["Spike Prime Hub", "Skewers", "Lollipop Sticks", "Cardboard Base", "Hot Glue/Tape", "Weights"],
        steps: [
          { id: "y5c1-1", title: "Wide Base Anchor", description: "Connect four long skewers into a wide square base. This lowers the center of gravity.", icon: "Box" },
          { id: "y5c1-2", title: "Vertical Risers", description: "Add four vertical pillars tilted slightly inwards. A tapered shape is more stable for tall structures.", icon: "ArrowUp" },
          { id: "y5c1-3", title: "Primary Bracing", description: "Connect the four pillars at the 20cm mark. This prevents the legs from splaying outwards.", icon: "AlignJustify" },
          { id: "y5c1-4", title: "The Power of Triangles", description: "Add diagonal cross-braces between every pillar. Triangles cannot be squashed or sheared!", icon: "Triangle" },
          { id: "y5c1-5", title: "Hub Mount Plate", description: "Secure a cardboard platform to the top. This will hold the Spike Prime Hub.", icon: "Package" },
          { id: "y5c1-6", title: "Stability Shake", description: "Gently tap the base. If the tower wobbles, add more 'X' bracing to the center sections.", icon: "Zap" }
        ],
        resources: [
          { title: "Tower Structural Guide", type: "PNG", id: "CHASSIS_TEMPLATE" },
          { title: "Triangulation Worksheet", type: "PDF", url: "/downloads/triangulation.pdf" }
        ]
      },
      thynk: {
        concepts: [
          { title: "Compression", description: "The squashing force that pushes down on the tower legs.", icon: "TrendingDown" },
          { title: "Tension", description: "The pulling force on the braces that stops the tower from falling over.", icon: "MoveHorizontal" },
          { title: "Center of Gravity", description: "The point where the weight of the tower is balanced. Lower is better!", icon: "Target" },
          { title: "Rigidity", description: "The ability of the structure to maintain its shape under pressure.", icon: "Shield" }
        ],
        explanation: { title: "Tall and Tough", text: "Watchtowers must be tall to see the enemy, but the higher you go, the easier it is to tip over. We use triangles to create a 'Truss' that stays rigid." },
        deepDive: {
          heading: "The Engineering of Radar Towers",
          whyItMatters: "During WWII, towers had to hold heavy 'Chain Home' radar arrays in gales without snapping.",
          realWorldApplication: "Modern radio masts and skyscrapers use exactly the same triangle patterns as your build.",
          logicExploration: "If one diagonal brace is missing, the whole square section can 'parallelogram' and collapse sideways."
        },
        quiz: [
          { id: 1, question: "Why do we use triangles in a watchtower?", options: ["They are the strongest shape", "They look like planes", "They use less tape", "They make it heavier"], answer: 0 },
          { id: 2, question: "What is 'Compression'?", options: ["A pulling force", "A squashing force", "A spinning force", "A light signal"], answer: 1 },
          { id: 3, question: "A tall tower is most stable when...", options: ["The base is very wide", "The top is heavy", "It has no braces", "It is made of paper"], answer: 0 },
          { id: 4, question: "Where is the best place to put a sensor?", options: ["At the bottom", "On the observation deck", "Under the base", "Inside a wheel"], answer: 1 },
          { id: 5, question: "What force pulls on a structure?", options: ["Compression", "Tension", "Friction", "Traction"], answer: 1 },
          { id: 6, question: "What does 'Tapered' mean?", options: ["Wider at the top", "Narrower at the top", "Round in the middle", "Blue in color"], answer: 1 }
        ]
      },
      tweak: {
        intro: "Reinforce your Defense Tower with these suggested upgrades:",
        options: [
          { id: "t1", title: "Double X-Brace", description: "Add bracing to every single face of the tower for 360-degree strength.", icon: "Shield" },
          { id: "t2", title: "Outrigger Base", description: "Extend the legs further out with extra straws to prevent tipping.", icon: "Maximize" },
          { id: "t3", title: "Foundation Weights", description: "Tape heavy weights to the base corners to lower the center of gravity.", icon: "Weight" },
          { id: "t4", title: "Aerodynamic Deck", description: "Add fins to deflect wind away from the top sensor platform.", icon: "Wind" },
          { id: "t5", title: "Observation Ladder", description: "Add internal horizontal straws to act as a structural ladder.", icon: "ListChecks" },
          { id: "t6", title: "Signal Dish", description: "Add a curved cardboard reflector to help 'catch' signals.", icon: "Radio" }
        ]
      },
      test: {
        intro: "Is the tower Ministry-approved?",
        methods: [
          { title: "Vertical Load Test", description: "Place the Spike Hub on the deck. Does the tower compress by more than 5mm?", icon: "Weight" },
          { title: "Wind Resistance", description: "Blow on the tower from 30cm away. Does it tip or slide?", icon: "Wind" },
          { title: "Height Verification", description: "Measure from base to deck. Is it exactly 40cm?", icon: "Ruler" }
        ]
      },
      teacherSupport: {
        outcomes: [
          { cat: "Engineering", outcome: "Design and build a stable 40cm tower using triangulation.", method: "Height and load test." },
          { cat: "Physics", outcome: "Analyze forces of compression and tension in a structure.", method: "Verbal explanation." }
        ],
        vocab: [
          { t: "Triangulation", d: "Strengthening a frame with 3-sided shapes." },
          { t: "Center of Gravity", d: "Point where weight is balanced." }
        ],
        pedagogy: [
          { title: "Inquiry", icon: "Lightbulb", subtitle: "Wobbly Rectangles", strategy: "Fail-Fast Modeling", focus: "Structural Logic", action: "Ask: 'Push your tower gently. Where is it bending? How can a triangle stop that?'" }
        ],
        rubric: [
          { criteria: "Structural Integrity", dev: "Tower wobbles or collapses under 50g.", prof: "Tower is stable and triangulated, holds 200g.", adv: "Advanced trusses used, perfectly level, holds 500g+." }
        ],
        misconceptions: [
          { error: "Taller is always better.", fix: "Height is useless if the tower tips over instantly. Stability is the priority!" }
        ],
        checklist: ["Triangles on every side?", "Base is wider than the top?", "40cm height reached?"],
        narrative: {
          story: "The gliders are silent. We need our towers high and steady to house the detection ears.",
          what: "A triangulated Watchtower.",
          howPhysical: "Using internal bracing to transfer weight to the base.",
          howRobotics: "The top platform must be level for the Spike Hub.",
          howLogic: "Structures must be reliable before adding electronics.",
          mission: "Support a Spike Hub for 10 seconds without buckling."
        }
      }
    },
    {
      id: "y5-c2",
      key: "CYCLE 2",
      title: "Early Warning",
      theme: "Sensor Integration",
      svgSchematic: `<svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="450" fill="#F1F5F9"/><rect x="350" y="200" width="100" height="150" rx="10" fill="#FACC15" stroke="#1E293B" stroke-width="4"/><circle cx="375" cy="230" r="15" fill="#334155"/><circle cx="425" cy="230" r="15" fill="#334155"/><path d="M430 230 Q500 150 600 230 T770 230" stroke="#7C3AED" stroke-width="4" stroke-dasharray="5 5"/><rect x="400" y="380" width="120" height="40" rx="8" fill="#F1F5F9" stroke="#7C3AED" stroke-width="2"/><text x="460" y="405" text-anchor="middle" font-family="Montserrat" font-size="12" fill="#7C3AED">SPIKE SENSOR</text><text x="400" y="80" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="22" fill="#1E293B">ULTRASONIC DETECTION</text></svg>`,
      make: {
        dailyGoal: "Mount a Spike Prime Ultrasonic Sensor on your tower and code it to trigger a 'Siren'.",
        description: "Program your Spike Hub to 'listen' for incoming threats using ultrasonic waves.",
        materials: ["Spike Prime Hub", "Ultrasonic Sensor", "Technic Wires", "Mounting Tape", "Elastic Bands"],
        steps: [
          { id: "y5c2-1", title: "Sensor Orientation", description: "Mount the ultrasonic sensor on the tower deck. The 'Eyes' must face the incoming flight path.", icon: "Eye" },
          { id: "y5c2-2", title: "Port Connection", description: "Connect the sensor to Port E of your Spike Hub. Ensure the wire is secure.", icon: "Radio" },
          { id: "y5c2-3", title: "Threshold Logic", description: "In your code, create a 'Wait Until' block for distance < 50cm.", icon: "Code" },
          { id: "y5c2-4", title: "The Warning Sound", description: "Add a 'Play Sound' block. Use a high-pitched siren sound from the Hub.", icon: "Cpu" },
          { id: "y5c2-5", title: "Visual Beacon", description: "Set the Hub's Light Matrix to pulse Red when a threat is detected.", icon: "Volume2" },
          { id: "y5c2-6", title: "Calibration Run", description: "Move your hand slowly towards the tower. Does the alarm go off at the right distance?", icon: "RefreshCw" }
        ],
        resources: [
          { title: "Spike Radar Logic Guide", type: "PNG", id: "LOGIC_GUIDE_1" },
          { title: "Hub & Sensor Mounting", type: "PNG", id: "COUPLING_INSTRUCTIONS" }
        ]
      },
      thynk: {
        concepts: [
          { title: "Ultrasonic", description: "Sound waves that are too high for humans to hear, used for measuring distance.", icon: "Zap" },
          { title: "Input/Output", description: "The sensor is the 'Input', and the Siren is the 'Output'.", icon: "Cpu" },
          { title: "Echo", description: "The reflection of a sound wave off an object.", icon: "Radio" },
          { title: "Latency", description: "The time it takes for the signal to be processed—must be low for defense!", icon: "Clock" }
        ],
        explanation: { title: "Invisible Eyes", text: "Ultrasonic sensors work like bats! They send out a sound and measure how long it takes to bounce back. This is 'Time of Flight'." },
        deepDive: {
          heading: "The Invention of RADAR",
          whyItMatters: "Radar saved Britain by giving pilots time to take off before the enemy arrived.",
          realWorldApplication: "Modern cars use ultrasonic sensors to help you park without hitting the wall!",
          logicExploration: "If the sensor detects a bird, should the alarm sound? We need code to filter out 'False Positives'."
        },
        quiz: [
          { id: 7, question: "What does an Ultrasonic sensor measure?", options: ["Distance", "Color", "Temperature", "Weight"], answer: 0 },
          { id: 8, question: "Which animal uses ultrasonic sound?", options: ["Bat", "Lion", "Giraffe", "Eagle"], answer: 0 },
          { id: 9, question: "If distance < 50 triggers alarm, what happens at 60cm?", options: ["Alarm sounds", "Nothing happens", "Hub explodes", "Matrix turns green"], answer: 1 },
          { id: 10, question: "The alarm is an example of...", options: ["Input", "Output", "Storage", "Battery"], answer: 1 },
          { id: 11, question: "What is 'Latency'?", options: ["Speed of sound", "Processing delay", "Height of the tower", "Color of the sensor"], answer: 1 },
          { id: 12, question: "Sound waves 'bounce' off objects. This is an...", options: ["Echo", "Absorption", "Refraction", "Transmission"], answer: 0 }
        ]
      },
      tweak: {
        intro: "Improve your Detection Logic with these suggested upgrades:",
        options: [
          { id: "t2-1", title: "Multi-Stage Alarm", description: "Yellow Matrix at 80cm, Red Matrix at 30cm.", icon: "Shield" },
          { id: "t2-2", title: "Voice Warning", description: "Program the Hub to speak: 'Incoming Threat Detected!'", icon: "Volume2" },
          { id: "t2-3", title: "Variable Pitch", description: "Make the siren sound higher pitched as the object gets closer.", icon: "Zap" },
          { id: "t2-4", title: "Sweep Mode", description: "Use a Spike motor to turn the sensor left and right (Scanning).", icon: "RefreshCw" },
          { id: "t2-5", title: "Data Logger", description: "Log the distance of the last 5 threats to a variable.", icon: "ListChecks" },
          { id: "t2-6", title: "Stealth Mode", description: "Turn off all LEDs but keep the buzzer active to hide the tower.", icon: "EyeOff" }
        ]
      },
      test: {
        intro: "Is the early warning reliable?",
        methods: [
          { title: "Detection Range", description: "Does it reliably detect a cardboard plane from 1 meter away?", icon: "Target" },
          { title: "False Alarm Test", description: "Does it ignore a small pencil moving past but catch a large hand?", icon: "Shield" },
          { title: "Reaction Speed", description: "Does the Matrix change within 0.1 seconds of detection?", icon: "Zap" }
        ]
      },
      teacherSupport: {
        outcomes: [
          { cat: "Computing", outcome: "Use a distance sensor to control a conditional logic loop.", method: "Code review." },
          { cat: "Physics", outcome: "Explain how sound waves are used to calculate distance.", method: "Verbal discussion." }
        ],
        vocab: [
          { t: "Input", d: "Data entering the system (Sensor)." },
          { t: "Output", d: "Action taken by the system (Siren)." }
        ],
        pedagogy: [
          { title: "Programming", icon: "Code", subtitle: "If-Then-Else", strategy: "Live Debugging", focus: "Logic", action: "Prompt: 'Your alarm is staying on! Is the condition checking if distance is LESS than or GREATER than?'" }
        ],
        rubric: [
          { criteria: "Sensor Accuracy", dev: "Code does not respond to distance.", prof: "Sensor triggers output at specified threshold.", adv: "Multi-stage alerts and variable feedback integrated." }
        ],
        misconceptions: [
          { error: "The sensor 'sees' the plane.", fix: "It doesn't see light; it hears the echo! It will work even in total darkness." }
        ],
        checklist: ["Sensor facing correctly?", "Cables are secure?", "Threshold distance set?"],
        narrative: {
          story: "The Ministry has delivered the first sonic-ears. We must tune them.",
          what: "An Ultrasonic Early Warning system.",
          howPhysical: "Mounting hardware to the triangulated tower deck.",
          howRobotics: "Connecting the sensor inputs to the Spike Hub.",
          howLogic: "Using a loop to constantly check for new threats.",
          mission: "Detect a moving target and flash the siren 3 times."
        }
      }
    },
    {
      id: "y5-c3",
      key: "CYCLE 3",
      title: "The Anderson Shelter",
      theme: "Automated Mechanics",
      svgSchematic: `<svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="450" fill="#F1F5F9"/><path d="M200 350 Q400 150 600 350" stroke="#1E293B" stroke-width="12" fill="#94A3B8"/><rect x="350" y="250" width="100" height="100" fill="#FACC15" stroke="#1E293B" stroke-width="4"/><circle cx="400" cy="300" r="20" fill="#7C3AED"/><path d="M400 320 L400 400" stroke="#7C3AED" stroke-width="4"/><text x="400" y="100" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="22" fill="#1E293B">SPIKE WINCH SHELTER</text></svg>`,
      make: {
        dailyGoal: "Build a cardboard Anderson Shelter with a door connected to a Spike Motor.",
        description: "Translate the Spike motor's spinning motion into linear sliding motion to seal the shelter.",
        materials: ["Spike Prime Hub", "Medium/Large Motor", "Corrugated Cardboard", "Technic String", "Lollipop Sticks"],
        steps: [
          { id: "y5c3-1", title: "Shelter Arch", description: "Curve a piece of cardboard into a tunnel shape. This arch distributes pressure evenly.", icon: "MoveHorizontal" },
          { id: "y5c3-2", title: "Door Rails", description: "Add two parallel lollipop sticks to the front for the door to slide between.", icon: "AlignJustify" },
          { id: "y5c3-3", title: "The Winch Drum", description: "Attach a Technic wheel to the motor. This will act as the 'Winch'.", icon: "RefreshCw" },
          { id: "y5c3-4", title: "Coupling the Tether", description: "Tie string to the door and the winch. When the motor spins, the door should rise or fall.", icon: "Link" },
          { id: "y5c3-5", title: "Friction Check", description: "If the door gets stuck, use a little graphite or smooth tape on the rails.", icon: "Zap" },
          { id: "y5c3-6", title: "Motor Timing", description: "Code the motor to spin exactly 180 degrees. Does the door seal the gap perfectly?", icon: "Play" }
        ],
        resources: [
          { title: "Anderson Shelter Blueprint", type: "PNG", id: "CHASSIS_TEMPLATE" },
          { title: "Spike Motor Winch Guide", type: "PNG", id: "AXE_GUIDE" }
        ]
      },
      thynk: {
        concepts: [
          { title: "Linear Motion", description: "Moving in a straight line (like the sliding door).", icon: "MoveHorizontal" },
          { title: "Rotational Motion", description: "Spinning in a circle (like the Spike motor).", icon: "RefreshCw" },
          { title: "Transmission", description: "Converting one type of motion to another (Circle to Line).", icon: "ArrowRight" },
          { title: "Load Capacity", description: "How heavy a door the motor can lift before stalling.", icon: "Weight" }
        ],
        explanation: { title: "From Circle to Line", text: "Motors spin, but doors often slide. By using a string and a winch, we can turn a 'Spin' into a 'Slide'. This is a basic machine!" },
        deepDive: {
          heading: "The Design of Anderson Shelters",
          whyItMatters: "Millions of people used these for safety. They were strong, simple, and cheap to build.",
          realWorldApplication: "Elevators (Lifts) use the exact same winch and cable system as your door.",
          logicExploration: "If the motor spins too far, the string might snap. We need precise 'Run for Degrees' code."
        },
        quiz: [
          { id: 13, question: "What motion does a motor produce?", options: ["Rotational", "Linear", "Diagonal", "Stationary"], answer: 0 },
          { id: 14, question: "What is 'Linear' motion?", options: ["Moving in a circle", "Moving in a straight line", "Vibrating", "Bouncing"], answer: 1 },
          { id: 15, question: "A 'Winch' converts spinning into...", options: ["Pulling", "Heating", "Cooling", "Lighting"], answer: 0 },
          { id: 16, question: "Why was the shelter curved?", options: ["To look pretty", "To spread out force", "To catch rain", "To save paper"], answer: 1 },
          { id: 17, question: "If the door is too heavy, the motor will...", options: ["Spin faster", "Stall or slip", "Change color", "Grow larger"], answer: 1 },
          { id: 18, question: "Which part holds the door in place?", options: ["The rails", "The roof", "The floor", "The light"], answer: 0 }
        ]
      },
      tweak: {
        intro: "Upgrade your Shelter Defense with these suggested upgrades:",
        options: [
          { id: "t3-1", title: "Heavy Armor", description: "Add extra layers of cardboard to the door for blast protection.", icon: "Shield" },
          { id: "t3-2", title: "Counter-Weight", description: "Add a small weight to the bottom of the door to help it fall faster.", icon: "Weight" },
          { id: "t3-3", title: "Interior Light", description: "Use the Hub Matrix to light up the inside of the shelter when it opens.", icon: "Lightbulb" },
          { id: "t3-4", title: "Quick-Close", description: "Modify the motor speed to 100% for high-speed emergency closure.", icon: "Zap" },
          { id: "t3-5", title: "Camouflage", description: "Add green paper or 'turf' to the roof to hide it from the air.", icon: "Flag" },
          { id: "t3-6", title: "Manual Latches", description: "Add physical cardboard tabs to lock the door once it is closed.", icon: "Lock" }
        ]
      },
      test: {
        intro: "Is the shelter safe?",
        methods: [
          { title: "Seal Test", description: "When the door closes, can you see light through the gaps? Goal: < 2mm gap.", icon: "Target" },
          { title: "Cycle Test", description: "Open and close the door 10 times. Does the string stay attached?", icon: "RefreshCw" },
          { title: "Speed Test", description: "How many seconds to fully close? Goal: < 3 seconds.", icon: "Clock" }
        ]
      },
      teacherSupport: {
        outcomes: [
          { cat: "Mechanics", outcome: "Convert rotational motion into linear motion using a winch system.", method: "Mechanical demonstration." },
          { cat: "Engineering", outcome: "Apply structural principles (arches) to a protective build.", method: "Stress test." }
        ],
        vocab: [
          { t: "Linear Motion", d: "Movement along a straight path." },
          { t: "Transmission", d: "Conversion of energy/motion." }
        ],
        pedagogy: [
          { title: "Mechanics", icon: "Hammer", subtitle: "Force Transfer", strategy: "Hands-On Tuning", focus: "Kinematics", action: "Ask: 'If the winch was twice as big, would the door move faster or slower?'" }
        ],
        rubric: [
          { criteria: "Mechanical Reliability", dev: "Door is jammed or string is tangled.", prof: "Winch operates the door smoothly in both directions.", adv: "Zero-friction rails and precise timing for a perfect seal." }
        ],
        misconceptions: [
          { error: "The motor pushes the door.", fix: "Actually, the motor pulls the string! It's a tension-based system." }
        ],
        checklist: ["Rails are parallel?", "Winch is centered?", "Door slides freely?"],
        narrative: {
          story: "The siren is sounding! We have seconds to seal the shelter.",
          what: "An automated Sliding Shelter Door.",
          howPhysical: "Constructing an arched frame with smooth sliding tracks.",
          howRobotics: "Using the Technic motor as a rotational winch.",
          howLogic: "Coding specific spin degrees for door travel.",
          mission: "Close the door from fully open to fully sealed."
        }
      }
    },
    {
      id: "y5-c4",
      key: "CYCLE 4",
      title: "The Total Defense System",
      theme: "Systems Synthesis",
      svgSchematic: `<svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="450" fill="#1E293B"/><circle cx="400" cy="225" r="120" fill="none" stroke="#F97316" stroke-width="4" stroke-dasharray="15 10"/><rect x="360" y="185" width="80" height="80" rx="10" fill="#FACC15" stroke="#F97316" stroke-width="2"/><text x="400" y="400" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="24" fill="white">FINAL MISSION: THE SILENT GLIDER</text></svg>`,
      make: {
        dailyGoal: "Combine your Tower, Sensor, and Shelter into one automated defense system.",
        description: "Your system must detect a silent glider and close the shelter door automatically using your Spike Hub.",
        materials: ["Watchtower", "Sensor System", "Anderson Shelter", "Spike Prime Hub", "Silent Glider"],
        steps: [
          { id: "y5f-1", title: "The Integration Grid", description: "Position your Tower 1 meter away from the Shelter. This is your 'Early Warning Perimeter'.", icon: "Target" },
          { id: "y5f-2", title: "Hub Port Mapping", description: "Sensor in Port E, Motor in Port A. Check all wires for structural interference.", icon: "Cpu" },
          { id: "y5f-3", title: "Logic Synthesis", description: "IF Distance < 50cm, THEN (Sound = Siren) AND (Motor = 180 Degrees).", icon: "Code" },
          { id: "y5f-4", title: "System Calibration", description: "Test the 'Reaction Window'. Is the door closed BEFORE the glider hits the tower base?", icon: "Clock" },
          { id: "y5f-5", title: "City-Wide Alert", description: "Add a delay of 2 seconds before the door closes to allow citizens to enter.", icon: "Users" },
          { id: "y5f-6", title: "Final Debrief", description: "Export your data. Did your system save the city from the air raid?", icon: "Trophy" }
        ],
        resources: [
          { title: "Defense Grid Strategy Map", type: "PNG", id: "ROUTE_MAP" },
          { title: "Ministry Final Assessment", type: "PNG", id: "MISSION_SCORING_SHEET" }
        ],
        challenge: {
          title: "The Silent Glider Challenge",
          description: "Detect a glider moving at 0.5m/s. Your system must trigger the alarm and seal the shelter door while the glider is still 20cm away.",
          requirements: ["Stable Tower", "Working Spike Sensor", "Motorised Door", "Zero-Touch Automation"]
        }
      },
      thynk: {
        concepts: [
          { title: "Synthesis", description: "The art of making separate machines work together as one system.", icon: "Zap" },
          { title: "Reliability", description: "The chance that the system will work every single time without human help.", icon: "Shield" },
          { title: "Reaction Time", description: "The total time from the first detection to the final action.", icon: "Clock" },
          { title: "Optimization", description: "Tweaking the system to be as fast and efficient as possible.", icon: "TrendingUp" }
        ],
        explanation: { title: "Master Defense Grid", text: "Today, your individual inventions become a system. Like the 'Dowding System' of 1940, information must flow fast to trigger action!" },
        deepDive: {
          heading: "The Dowding System",
          whyItMatters: "It was the world's first integrated air defense network. It won the Battle of Britain.",
          realWorldApplication: "Smart homes use this today! A sensor detects heat, and a system turns on the fan.",
          logicExploration: "If the sensor fails, does the door still close? Engineers design 'Fail-Safes' for emergencies."
        },
        quiz: [
          { id: 19, question: "What is 'Synthesis'?", options: ["Merging parts together", "Breaking a machine", "Ignoring a sensor", "Losing a race"], answer: 0 },
          { id: 20, question: "The goal of our system is to...", options: ["Protect the city", "Build a plane", "Eat lunch", "Sing a song"], answer: 0 },
          { id: 21, question: "If Sensor = 40cm, THEN Door = Close. This is...", options: ["Automated Logic", "Manual Control", "Random Luck", "Physics Error"], answer: 0 },
          { id: 22, question: "What is the most important part of a defense system?", options: ["Reliability", "The color of tape", "The size of the hub", "The price of cardboard"], answer: 0 },
          { id: 23, question: "A 'Fail-Safe' is a backup plan...", options: ["If something breaks", "To make it faster", "To use more power", "To make it heavier"], answer: 0 },
          { id: 24, question: "Reaction time is measured in...", options: ["Seconds", "Kilograms", "Meters", "Degrees"], answer: 0 }
        ]
      },
      tweak: {
        intro: "Final Defense Optimization with these suggested upgrades:",
        options: [
          { id: "f1", title: "Panic Siren", description: "Add a strobe light effect on the Hub Matrix when the door is moving.", icon: "Zap" },
          { id: "f2", title: "Manual Override", description: "Program the Hub Button to open the door manually.", icon: "Target" },
          { id: "f3", title: "Secondary Sensor", description: "Add a second sensor at 80cm for a 'Pre-Warning' beep.", icon: "Radio" },
          { id: "f4", title: "Blast Wall", description: "Build a physical barrier between the tower and the shelter.", icon: "Shield" },
          { id: "f5", title: "Citizen Counter", description: "Use a variable to count how many 'gliders' have been detected.", icon: "Code" },
          { id: "f6", title: "Remote Relay", description: "Program two Spike Hubs to talk to each other to spread the alert.", icon: "Signal" }
        ]
      },
      test: {
        intro: "The Final Inspection!",
        methods: [
          { title: "The Silent Approach", description: "Slide a plane towards the tower. Does the door close automatically?", icon: "Zap" },
          { title: "System Speed", description: "Total time from detection to 'Fully Sealed'. Goal: < 4 seconds.", icon: "Clock" },
          { title: "Integration Check", description: "Does the tower remain standing when the motor pulls the door?", icon: "Shield" }
        ]
      },
      teacherSupport: {
        outcomes: [
          { cat: "Systems", outcome: "Synthesize mechanical, structural, and computing components into an automated system.", method: "Mission Run." },
          { cat: "Evaluation", outcome: "Analyze system reliability and identify potential fail points.", method: "Lab Report." }
        ],
        vocab: [
          { t: "Synthesis", d: "Merging elements into a unified system." },
          { t: "Integration", d: "Connecting hardware and software." }
        ],
        pedagogy: [
          { title: "Systems", icon: "Settings2", subtitle: "Interconnectivity", strategy: "Root-Cause Analysis", focus: "Logic", action: "Ask: 'If the door didn't close, was it a mechanical jam or a code error?'" }
        ],
        rubric: [
          { criteria: "System Synthesis", dev: "Parts do not interact automatically.", prof: "Sensor successfully triggers motorized door closure.", adv: "High-speed, optimized defense grid with multi-stage feedback." }
        ],
        misconceptions: [
          { error: "One part is more important than the others.", fix: "A system is only as strong as its weakest link! Every straw and every block of code matters." }
        ],
        checklist: ["Tower is steady?", "Sensor is calibrated?", "Door is sliding?", "Code is looping?"],
        narrative: {
          story: "The Ministry is proud. You have built a defense grid.",
          what: "A Fully Integrated Defense Grid.",
          howPhysical: "Combining structural stability with motorized mechanics.",
          howRobotics: "Using one Spike Hub to manage multiple sensor and motor outputs.",
          howLogic: "Designing complex 'Conditional Statements' to manage safety.",
          mission: "Successfully defend the city 5 times in a row."
        }
      }
    }
  ]
};
