<script>
  import "../app.css";
  import { db } from '/src/lib/firebase';
  import { doc, updateDoc, getDoc } from 'firebase/firestore';
  import { HighScore, Bruker } from '/src/stores'

  let ButtonNumber = 0 
  
  async function Button(){
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
          console.error("User document does not exist.")
        }
      } 
      catch (error) {
        console.error("Error updating high score: ", error)
      }
    }
  }
</script>
<div id="main" class="flex flex-col items-center bg-black w-screen h-screen">
  <div id="navbar" class="flex justify-evenly items-center w-full h-1/6 bg-navy">
      <a href="/scoreboard" class="flex justify-center btn items-center w-1/5 md:w-1/6 h-1/4 rounded-lg font-mono text-xs md:text-xl bg-blue">
          Scoreboard
      </a>
      <div class="flex justify-center items-center w-2/6 h-1/4 md:w-1/5 md:h-2/5 rounded-lg bg-blue font-mono text-base md:text-3xl">
          Highscore {$HighScore}
      </div>
        <a href="/login" class="flex justify-center btn items-center w-1/6 md:w-1/12 h-1/4 rounded-lg bg-blue font-mono text-xs md:text-xl">
            Logg inn 
        </a>
        <div class="flex justify-center items-center w-1/6 md:w-1/12 h-1/4 rounded-lg bg-blue font-mono text-xs md:text-xl">
            {$Bruker}
        </div>
  </div>
  <div id="resten" class="flex justify-center items-center w-full h-5/6">
      <button on:click={()=>Button()} class="w-4/6 md:w-2/6 h-2/6 md:h-4/6 bg-sky btn rounded-full text-3xl md:text-9xl">{ButtonNumber}</button>
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