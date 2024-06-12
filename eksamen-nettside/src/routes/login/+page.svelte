<script>
    import { onMount } from 'svelte';
    import { db } from '/src/lib/firebase';
    import { doc, setDoc, getDoc } from 'firebase/firestore';
    import { HighScore } from '/src/stores'
    import { Bruker } from '/src/stores'

    let BrukerNavn = ""
    let Password = ""
    
    async function login() {
    try {
      const userDoc = await getDoc(doc(db, 'users', BrukerNavn))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        if (userData.Password == Password) {
            console.log('User logged in:', BrukerNavn)
            console.log('User data:', userData)
            HighScore.set(userData.HighScore)
            Bruker.set(BrukerNavn)
        } 
        else {
          console.error('feil password')
        }
      } 
      else {
        console.error('Dette finnes ikke')
      }
    } 
    catch (error) {
      console.error('Error logging in: ', error)
    }
  }

  async function register() {
    try {
      const userDoc = await getDoc(doc(db, 'users', BrukerNavn))
      if (userDoc.exists()) {
        console.error('User already exists')
      } 
      else {
            await setDoc(doc(db, 'users', BrukerNavn), {
          Password: Password,
          HighScore: 0
        })
        console.log('User registered:', BrukerNavn)
        HighScore.set(userData.HighScore)
        Bruker.set(BrukerNavn)
      }
    } 
    catch (error) {
      console.error('Error registering:', error)
    }
  }
  </script>
  <div id="main" class="flex flex-col items-center w-screen h-screen bg-black">
    <div id="navbar" class="flex justify-evenly items-center w-full h-1/6 bg-navy">
        <a href="/scoreboard" class="flex justify-center btn items-center w-1/5 md:w-1/6 h-1/4 rounded-lg font-mono text-xs md:text-xl bg-blue">
            Scoreboard
        </a>
        <div class="flex justify-center items-center w-2/6 h-1/4 md:w-1/5 md:h-2/5 rounded-lg bg-blue font-mono text-base md:text-3xl">
            Highscore {$HighScore}
        </div>
        <a href="/" class="flex justify-center btn items-center w-1/6 md:w-1/12 h-1/4 rounded-lg bg-blue font-mono text-xs md:text-xl">
            Home 
        </a>
        <div class="flex justify-center items-center w-1/6 md:w-1/12 h-1/4 rounded-lg bg-blue font-mono text-xs md:text-xl">
            {$Bruker}
        </div>
    </div>
    <div class="flex flex-col items-center justify-between w-5/6 md:w-2/6 h-4/6 bg-sky rounded-xl mt-16">
        <div class="flex flex-col w-5/6 h-2/6 justify-evenly">
            <input class="bg-blue text-xl rounded w-full h-12" type="email" bind:value={BrukerNavn} placeholder="Bruker Navn" />
            <input class="bg-blue text-xl rounded w-full h-12" type="password" bind:value={Password} placeholder="Password" />
        </div>
        <div class="flex justify-evenly w-5/6 h-1/6">
            <button class="bg-blue btn text-2xl w-28 h-12 rounded" on:click={()=>login()}>Login</button>
            <button class="bg-blue btn text-2xl w-28 h-12 rounded" on:click={()=>register()}>Register</button>
        </div>
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
