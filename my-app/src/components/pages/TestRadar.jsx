import { useState } from "react";

const skills = [
  { label: "การคิดวิเคราะห์", score: 0.5, angle: 0 },
  { label: "การสื่อสาร", score: 1.2, angle: 60 },
  { label: "การทำงานร่วมกับผู้อื่น", score: 2.5, angle: 120 },
  { label: "การแก้ปัญหา", score: 3.0, angle: 180 },
  { label: "ความคิดสร้างสรรค์", score: 4.0, angle: 240 },
  { label: "การดูแลตัวเอง", score: 5.0, angle: 300 },
];

const average = (
  skills.reduce((s, k) => s + k.score, 0) / skills.length
).toFixed(1);

function scoreToColor(score) {
  if (score >= 4.5) { return { fill: "#b6b8dc", opacity: 0.9 }; }
  if (score >= 4) { return { fill: "#c9c7e2", opacity: 0.88 }; }
  if (score >= 3) { return { fill: "#d6d4e9", opacity: 0.86 }; }
  if (score >= 2) { return { fill: "#e4e3f1", opacity: 0.84 }; }
  return { fill: "#f1f1f8", opacity: 0.82 };
}

function getLabelPosition(angle, radius = 195) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

export default function SkillFlower() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="flex justify-center">
        <svg viewBox="-260 -260 520 520" width="100%" className="max-w-xs">
          {/* Outer white petals */}
          {skills.map((skill, i) => {
            const rad = ((skill.angle - 90) * Math.PI) / 180;
            const cx = Math.cos(rad) * 100;
            const cy = Math.sin(rad) * 100;
            return (
              <ellipse
                key={`white-${i}`}
                cx={cx} cy={cy}
                rx={60} ry={85}
                fill="white"
                transform={`rotate(${skill.angle}, ${cx}, ${cy})`}
              />
            );
          })}

          {/* Colored inner petals */}
          {skills.map((skill, i) => {
            const { fill, opacity } = scoreToColor(skill.score);
            const rad = ((skill.angle - 90) * Math.PI) / 180;
            const cx = Math.cos(rad) * 100;
            const cy = Math.sin(rad) * 100;
            const isHovered = hovered === i;
            return (
              <ellipse
                key={`colored-${i}`}
                cx={cx} cy={cy}
                rx={isHovered ? 54 : 50}
                ry={isHovered ? 76 : 72}
                fill={fill}
                opacity={isHovered ? 1 : opacity}
                transform={`rotate(${skill.angle}, ${cx}, ${cy})`}
                style={{ transition: "all 0.2s ease", cursor: "pointer" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            );
          })}

          {/* Center circle */}
          <circle cx={0} cy={0} r={48} fill="white" />
          <circle cx={0} cy={0} r={42} fill="white" stroke="#B5D4F4" strokeWidth={2} />
          <text
            x={0} y={0}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={28} fontWeight={700}
            fill="#185FA5" fontFamily="sans-serif"
          >
            {average}
          </text>

          {/* Labels — radius 195, clear of petals */}
          {skills.map((skill, i) => {
            const pos = getLabelPosition(skill.angle, 195);
            const breakPoints = {
              "การทำงานร่วมกับผู้อื่น": ["การทำงาน", "ร่วมกับผู้อื่น"],
              "ความคิดสร้างสรรค์": ["ความคิด", "สร้างสรรค์"],
            };
            const lines = breakPoints[skill.label] || (skill.label.length > 7
              ? [skill.label.slice(0, Math.ceil(skill.label.length / 2)), skill.label.slice(Math.ceil(skill.label.length / 2))]
              : [skill.label]);
            const isHovered = hovered === i;
            return (
              <g key={`label-${i}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}>
                {lines.map((line, li) => (
                  <text
                    key={li}
                    x={pos.x}
                    y={pos.y - 10 + li * 17}
                    textAnchor="middle"
                    fontSize={12} fontWeight={500}
                    fill={isHovered ? "#042C53" : "#185FA5"}
                    fontFamily="sans-serif"
                    style={{ transition: "fill 0.2s" }}
                  >
                    {line}
                  </text>
                ))}
                <text
                  x={pos.x}
                  y={pos.y + (lines.length > 1 ? 24 : 10)}
                  textAnchor="middle"
                  fontSize={16} fontWeight={700}
                  fill={isHovered ? "#042C53" : "#185FA5"}
                  fontFamily="sans-serif"
                  style={{ transition: "fill 0.2s" }}
                >
                  {skill.score.toFixed(1)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}