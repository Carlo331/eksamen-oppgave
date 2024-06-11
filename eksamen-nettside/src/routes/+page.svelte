<script>
  import "../app.css";
  import { db } from '/src/lib/firebase';
  import { doc, updateDoc, getDoc } from 'firebase/firestore';
  import { HighScore, Bruker } from '/src/stores'

  let ButtonNumber = 0 
  let Sjanse = 100
  
  async function Button(){
    ButtonNumber = ButtonNumber + 1

    Sjanse = 100 / ButtonNumber
    Sjanse = Math.round(Sjanse)
  
    let Random = Math.round(Math.random() * Sjanse) 
    console.log("sjanse", Sjanse)
    console.log("Random", Random)
   
    if(Random == Sjanse){
      ButtonNumber = 0
      Sjanse = 100 
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
            HighScore: ButtonNumber
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

<div id="main" class="flex flex-col items-center w-screen h-screen bg-navy">
  <div id="navbar" class="flex justify-evenly items-center w-full h-1/6 bg-purple"> 
    <a href="/question" class="flex justify-center btn items-center w-2/12 h-1/4 rounded-lg bg-orange font-mono text-2xl">
      Scoreboard
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
  <div id="resten" class="flex justify-center items-center w-full h-5/6">
    <button on:click={()=>Button()} class="w-[600px] h-[600px] bg-yellow btn rounded-full text-9xl">{ButtonNumber}</button>
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