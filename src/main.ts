import { MetaGaParams, formatMetaChromosome } from './types.js';
import { generateCircleTsp, parseTsplib } from './tsp.js';
import { runMetaGa, printPopulation } from './meta-ga.js';
import { readFileSync } from 'node:fs';

function main() {
  // Parse CLI args or use defaults
  const args = process.argv.slice(2);
  const getArg = (name: string, def: string) => {
    const idx = args.indexOf(`--${name}`);
    return idx >= 0 && args[idx + 1] ? args[idx + 1] : def;
  };

  const tspFile = getArg('tsp', '');
  const popSize = parseInt(getArg('popSize', '12'));
  const numGens = parseInt(getArg('numGens', '12'));
  const maxTspGens = parseInt(getArg('maxTspGens', '100'));
  const mutRate = parseFloat(getArg('mutRate', '0.35'));
  const xRate = parseFloat(getArg('xRate', '0.85'));
  const elitismPercent = parseFloat(getArg('elitismPercent', '0.1'));
  const seed = parseInt(getArg('seed', '42'));
  const optimum = parseFloat(getArg('optimum', 'Infinity'));

  let tspInstance;
  if (tspFile) {
    const content = readFileSync(tspFile, 'utf-8');
    tspInstance = parseTsplib(content, optimum);
  } else {
    // Default: use a 32-city circle for a quick demo
    tspInstance = generateCircleTsp(32);
    console.log(`Using default circle32 instance (optimum: ${tspInstance.knownOptimum.toFixed(2)})`);
  }

  const params: MetaGaParams = {
    popSize,
    numGens,
    maxTspGens,
    mutRate,
    xRate,
    elitismPercent,
    tspInstance,
    seed,
  };

  console.log(`\nMetaGA4TSP`);
  console.log(`==========`);
  console.log(`TSP: ${tspInstance.name} (${tspInstance.cities.length} cities)`);
  console.log(`Meta-GA: popSize=${popSize}, numGens=${numGens}, maxTspGens=${maxTspGens}`);
  console.log(`         mutRate=${mutRate}, xRate=${xRate}, elitism=${elitismPercent}`);
  console.log(`         seed=${seed}\n`);

  const finalPop = runMetaGa(params, {
    onGenerationEnd(gen, population) {
      const sorted = [...population].sort((a, b) => b.fitness - a.fitness);
      const avg = sorted.reduce((s, i) => s + i.fitness, 0) / sorted.length;
      const best = sorted[0];
      console.log(
        `Gen ${gen}: avg=${avg.toFixed(2)}% best=${best.fitness.toFixed(2)}% ${formatMetaChromosome(best.chromosome)}`
      );
    },
  });

  console.log(`\nFinal population:`);
  printPopulation(finalPop);
}

main();
