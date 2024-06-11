<script>
    import { db } from '/src/lib/firebase';
    import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
    import { HighScore } from '/src/stores'

</script>
<div id="main" class="flex flex-col items-center w-screen h-screen bg-navy">
  <div id="navbar" class="flex justify-evenly items-center w-full h-1/6 bg-purple"> 
    <a href="/" class="flex justify-center btn items-center w-1/12 h-1/4 rounded-lg bg-orange font-mono text-2xl">
      Home
    </a>
    <div class="flex justify-center items-center w-1/6 h-2/5 rounded-lg bg-orange font-mono text-3xl">
      High score {$HighScore}
    </div>
    <a href="/login" class="flex justify-center items-center w-1/12 h-1/4 rounded-lg bg-orange font-mono text-2xl">
      Logg inn 
    </a>
    <div class="flex justify-center items-center w-1/12 h-1/4 rounded-lg bg-orange font-mono text-2xl">
      {$Bruker}
    </div>
  </div>
</div>