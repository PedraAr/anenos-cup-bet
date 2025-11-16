// app.js - utilidades compartidas
export function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }

export function estimateScoreProbability(h,a){
  const expectedHome = 1.4, expectedAway = 1.1;
  const dif = Math.abs(h - expectedHome) + Math.abs(a - expectedAway);
  const sum = h + a;
  let prob = Math.exp(-0.45 * dif) * Math.exp(-0.08 * Math.abs(sum - 2.5));
  return clamp(prob, 0.005, 0.6);
}

export function estimateGoalsProbability(g){
  const expected = 2.5;
  let prob = Math.exp(-0.6 * Math.abs(g - expected));
  prob = prob * 0.35;
  return clamp(prob, 0.01, 0.65);
}

export function probToOdds(prob){
  const fair = 1 / prob;
  const adjusted = fair * 1.06; // house edge 6%
  return Math.max(1.01, adjusted);
}

export function capPotential(stake, rawPotential, prob){
  const maxMult = prob < 0.12 ? 3.0 : 2.0;
  return Math.min(rawPotential, stake * maxMult);
}
