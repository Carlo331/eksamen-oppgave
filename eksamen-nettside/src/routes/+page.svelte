<script>
  import "../app.css";
  import { db } from '/src/lib/firebase';
  import { doc, updateDoc, getDoc } from 'firebase/firestore';
  import { HighScore, Bruker, Popup } from '/src/stores'
  import { onMount } from "svelte";
  import Login from './scoreboard/login.svelte'

  let ButtonNumber = 0 

  let lastCallTime = 0
  const debounceTime = 150
  
  async function Button(){
    const currentTime = Date.now()
    if (currentTime - lastCallTime < debounceTime) {
      return
    }
    lastCallTime = currentTime

    ButtonNumber = ButtonNumber + 1

    let Random = Math.round(Math.random() * 99) 
    console.log("Random", Random)
   
    if(Random <= ButtonNumber - 1){
      ButtonNumber = 0
      console.log("død")
    }

    if (ButtonNumber > $HighScore) {
      console.log("yolo")
      HighScore.set(ButtonNumber)
      try {
        const userDocRef = doc(db, 'users', $Bruker)
        const userDocSnap = await getDoc(userDocRef)
        if (userDocSnap.exists()) {
          console.log("Updating high score for user:", $Bruker)
          await updateDoc(userDocRef, {
            HighScore: $HighScore
          })
          console.log("High Score updated")
        } 
        else {
          alert("Du har ingen bruker. Dette gjør at din Highscore ikke blir lagret til neste gang")
        }
      } 
      catch (error) {
        alert("Du har ingen bruker. Dette gjør at din Highscore ikke blir lagret til neste gang")
      }
    }
    
  }
  onMount(() => {
    document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      if (document.activeElement.id === 'Button') {
        alert("Enter er ulovlig. (for gode grunner)")
        ButtonNumber = 0
      }
    }
  })
  })
</script>
<div id="main" class="flex flex-col items-center bg-black w-screen h-screen">
  {#if $Popup}
    <Login/>
  {/if}
  <div id="navbar" class="flex justify-evenly items-center w-full h-1/6 bg-navy">
      <a href="/scoreboard" class="flex justify-center btn items-center w-1/5 md:w-1/6 h-1/4 rounded-lg font-mono text-xs md:text-xl bg-blue">
          Scoreboard
      </a>
      <div class="flex justify-center items-center w-2/6 h-1/4 md:w-1/5 md:h-2/5 rounded-lg bg-blue font-mono text-base md:text-3xl">
          Highscore {$HighScore}
      </div>
        <button on:click={()=> {Popup.set(true)}} class="flex justify-center btn items-center w-1/6 md:w-1/12 h-1/4 rounded-lg bg-blue font-mono text-xs md:text-xl">
            Logg inn 
        </button>
        <div class="flex justify-center items-center w-1/6 md:w-1/12 h-1/4 rounded-lg bg-blue font-mono text-xs md:text-xl">
            {$Bruker}
        </div>
  </div>
  <div id="resten" class="flex justify-center items-center w-full h-5/6">
      <button id="Button" on:click={()=>Button()} class="w-4/6 md:w-2/6 h-2/6 md:h-4/6 bg-sky btn rounded-full text-3xl md:text-9xl">{ButtonNumber}</button>
  </div>
</div>
<style>
  .btn {
    transition: transform 0.05s ease;
  }
  .btn:active {
    transform: scale(0.95);
  }
</style>