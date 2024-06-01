<script>
  import "../app.css";
  let HighScore = 0
  let ButtonNumber = 0 
  let Sjanse = 100

  function Button(){
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

    if(ButtonNumber > HighScore){
          HighScore = ButtonNumber
          console.log("High Score")
        }
  }

</script>
<div id="main" class="flex flex-col justify-center w-screen h-screen bg-navy">
  <div id="navbar" class="flex justify-evenly items-center w-full h-1/6 bg-purple"> 
    <div class="flex justify-center items-center w-1/12 h-1/4 rounded-lg bg-orange font-mono text-4xl">
      FAQ
    </div>
    <div class="flex justify-center items-center w-1/6 h-2/5 rounded-lg bg-orange font-mono text-5xl">
      High score {HighScore}
    </div>
    <div class="flex justify-center items-center w-1/12 h-1/4 rounded-lg bg-orange font-mono text-4xl">
      Logg inn 
    </div>
  </div>
  <div id="resten" class="flex justify-center items-center w-full h-5/6">
    <button on:click={()=>Button()} class="w-[1000px] h-[1000px] bg-yellow btn rounded-full text-9xl">{ButtonNumber}</button>
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