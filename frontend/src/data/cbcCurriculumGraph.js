/**
 * CBC (Competency-Based Curriculum) & KCSE Prerequisite Knowledge Graph
 * Defines KICD Strands, Sub-strands, Grade 7 - Grade 12 Learning Outcomes,
 * and Prerequisite DAG (Directed Acyclic Graph) Dependencies.
 */

export const CBC_CURRICULUM_GRAPH = {
  math: {
    name: "Mathematics",
    strands: [
      {
        id: "numbers",
        label: "Numbers & Operations",
        subStrands: [
          {
            id: "integers",
            label: "Integers & Directed Numbers",
            grade: "Grade 7 (JSS)",
            prerequisites: [],
            competencies: ["Critical Thinking", "Problem Solving"]
          },
          {
            id: "fractions_decimals",
            label: "Fractions, Decimals & Percentages",
            grade: "Grade 7 (JSS)",
            prerequisites: ["integers"],
            competencies: ["Financial Literacy", "Accuracy"]
          }
        ]
      },
      {
        id: "algebra",
        label: "Algebraic Expressions & Equations",
        subStrands: [
          {
            id: "linear_equations",
            label: "Linear Equations & Inequalities",
            grade: "Grade 8 (JSS)",
            prerequisites: ["integers", "fractions_decimals"],
            competencies: ["Abstract Reasoning", "Problem Solving"]
          },
          {
            id: "quadratic_expressions_1",
            label: "Quadratic Expressions I (Expansion & Factoring)",
            grade: "Grade 9 (JSS)",
            prerequisites: ["linear_equations"],
            competencies: ["Pattern Recognition", "Critical Thinking"]
          },
          {
            id: "quadratic_equations_2",
            label: "Quadratic Equations II (Formula, Completing Square & Real-World Modeling)",
            grade: "Grade 10 (SSS)",
            prerequisites: ["quadratic_expressions_1"],
            competencies: ["Real-World Scenario Modeling", "Mathematical Transfer"]
          }
        ]
      },
      {
        id: "measurement",
        label: "Measurement & Geometry",
        subStrands: [
          {
            id: "area_perimeter",
            label: "Area, Perimeter & Volume",
            grade: "Grade 7 (JSS)",
            prerequisites: ["integers"],
            competencies: ["Spatial Literacy", "Precision"]
          },
          {
            id: "map_work_scale",
            label: "Scale Drawing & Map Work",
            grade: "Grade 8 (JSS)",
            prerequisites: ["area_perimeter", "fractions_decimals"],
            competencies: ["Spatial Orientation", "Real-World Application"]
          },
          {
            id: "trigonometry",
            label: "Trigonometrical Ratios & Bearings",
            grade: "Grade 10 (SSS)",
            prerequisites: ["linear_equations", "area_perimeter"],
            competencies: ["Navigation Modeling", "Analytical Thinking"]
          }
        ]
      },
      {
        id: "financial_math",
        label: "Commercial & Financial Mathematics",
        subStrands: [
          {
            id: "profit_loss_margin",
            label: "Cost Price, Selling Price & Profit Margin",
            grade: "Grade 8 (JSS)",
            prerequisites: ["fractions_decimals"],
            competencies: ["Financial Literacy", "Entrepreneurship"]
          },
          {
            id: "compound_interest_tax",
            label: "Compound Interest, Taxation & Depreciation",
            grade: "Grade 11 (SSS)",
            prerequisites: ["profit_loss_margin", "linear_equations"],
            competencies: ["Economic Citizenship", "Decision Making"]
          }
        ]
      }
    ]
  },
  sciences: {
    name: "Integrated Science / Physics / Chemistry / Biology",
    strands: [
      {
        id: "physics_mechanics",
        label: "Forces, Motion & Energy",
        subStrands: [
          {
            id: "kinematics",
            label: "Linear Motion & Acceleration",
            grade: "Grade 9 (JSS)",
            prerequisites: ["math.algebra.linear_equations"],
            competencies: ["Scientific Investigation", "Data Interpretation"]
          },
          {
            id: "electricity_circuits",
            label: "Current Electricity & Ohm's Law",
            grade: "Grade 10 (SSS)",
            prerequisites: ["kinematics"],
            competencies: ["Digital & Energy Literacy", "Safety"]
          }
        ]
      },
      {
        id: "chemistry_matter",
        label: "Matter & Stoichiometry",
        subStrands: [
          {
            id: "molar_mass_moles",
            label: "Molar Mass & Mole Concept",
            grade: "Grade 9 (JSS)",
            prerequisites: ["math.numbers.fractions_decimals"],
            competencies: ["Quantitative Chemistry", "Accuracy"]
          },
          {
            id: "reactions_kinetics",
            label: "Reaction Kinetics & Titration",
            grade: "Grade 11 (SSS)",
            prerequisites: ["molar_mass_moles"],
            competencies: ["Laboratory Analysis", "Critical Thinking"]
          }
        ]
      }
    ]
  }
};

/**
 * Trace prerequisite graph backward to isolate foundational knowledge gaps.
 */
export function getPrerequisiteChain(subjectId, subStrandId) {
  const chain = [];
  const subject = CBC_CURRICULUM_GRAPH[subjectId];
  if (!subject) return chain;

  const findSubStrand = (id) => {
    for (const strand of subject.strands) {
      const match = strand.subStrands.find(ss => ss.id === id);
      if (match) return match;
    }
    return null;
  };

  let current = findSubStrand(subStrandId);
  while (current) {
    chain.push(current);
    if (current.prerequisites && current.prerequisites.length > 0) {
      const nextId = current.prerequisites[0].split(".").pop();
      current = findSubStrand(nextId);
    } else {
      current = null;
    }
  }

  return chain;
}
