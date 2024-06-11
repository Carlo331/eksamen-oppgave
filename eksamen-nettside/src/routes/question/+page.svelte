<script>
  import { db } from '/src/lib/firebase'
  import { collection, query, orderBy, doc, getDocs, setDoc } from 'firebase/firestore'
  import { HighScore, Bruker } from '/src/stores'
  import { onMount } from 'svelte'
  import Score from '../components/score.svelte'

  let HighScores = []

  async function fetchHighScores() {
    const highScoresRef = collection(db, 'HighScores')
    const q = query(highScoresRef, orderBy('score', 'desc'))
    const querySnapshot = await getDocs(q)
    HighScores = querySnapshot.docs.map(doc => doc.data())
  }

  onMount(fetchHighScores)
  console.log(HighScores)
</script>
<div id="main" class="flex flex-col items-center w-screen h-screen bg-navy">
  <div id="navbar" class="flex justify-evenly items-center w-full h-1/6 bg-purple"> 
    <a href="/" class="flex justify-center btn items-center w-1/12 h-1/4 rounded-lg bg-orange font-mono text-2xl">
      Home
    </a>
    <div class="flex justify-center items-center w-64 h-2/5 rounded-lg bg-orange font-mono text-3xl">
      High score {$HighScore}
    </div>
    <a href="/login" class="flex justify-center items-center w-1/12 h-1/4 rounded-lg bg-orange font-mono text-2xl">
      Logg inn 
    </a>
    <div class="flex justify-center items-center w-1/12 h-1/4 rounded-lg bg-orange font-mono text-2xl">
      {$Bruker}
    </div>
  </div>
  <div class="flex flex-col items-center justify-between w-4/6 h-4/6 bg-yellow rounded-xl mt-16">
    {#each HighScores as score, index}
      <Score user={score.user} score={score.score} index={index}/>
    {/each}
  </div>
</div>