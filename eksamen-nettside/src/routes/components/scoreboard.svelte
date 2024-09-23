<script>
  import { db } from '/src/lib/firebase'
  import { collection, query, orderBy, doc, getDocs, setDoc } from 'firebase/firestore'
  import { onMount } from 'svelte'
  import Score from './score.svelte'
  import {writable} from 'svelte/store'
  import { HighScore, Bruker, PopupI, PopupS } from '/src/stores'
  
  export const HighScores = writable([])

async function fetchHighScores() {
  console.log("Fetching high scores...")
  try {
    const highScoresRef = collection(db, 'users')
    const q = query(highScoresRef, orderBy('HighScore', 'desc'))
    const querySnapshot = await getDocs(q)
    const scores = querySnapshot.docs.map(doc => ({
      user: doc.id,
      score: doc.data().HighScore
    }));
    HighScores.set(scores)
    console.log("High scores fetched:", scores)
  } catch (error) {
    console.error("Error fetching high scores:", error)
  }
}

onMount(() => {
  fetchHighScores();
});
</script>
<div class="flex flex-col items-center absolute z-10 w-5/6 md:w-4/6 h-5/6">
  <div class="flex flex-col overflow-auto items-center  w-full h-full bg-blue rounded-xl mt-16">
  {#each $HighScores as score, index}
    <Score user={score.user} score={score.score} index={index}/>
  {/each}
  </div>
  <button on:click={()=> {PopupS.set(false)}} class=" flex items-center mt-5 justify-center btn rounded w-12 h-12 bg-navy text-sky text-4xl">X</button>
</div>

<style>
  .btn {
    transition: transform 0.05s ease;
  }
  .btn:active {
    transform: scale(0.95);
  }

  ::-webkit-scrollbar {
  width: 11px;
}

::-webkit-scrollbar-track {
  background: #2c76a8;
  border-radius: 0.2rem;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 0.2rem;
}

::-webkit-scrollbar-thumb:hover {
  background: #777777
  }
</style>
