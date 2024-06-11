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
        if (userData.Password === Password) {
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
  
  <div id="main" class="flex flex-col items-center w-screen h-screen bg-navy">
    <div id="navbar" class="flex justify-evenly items-center w-full h-1/6 bg-purple"> 
      <a href="/question/" class="flex justify-center btn items-center w-2/12 h-1/4 rounded-lg bg-orange font-mono text-2xl">
        Scoreboard
      </a>
      <div class="flex justify-center items-center w-64 h-2/5 rounded-lg bg-orange font-mono text-3xl">
        High score {$HighScore}
      </div>
      <a href="/" class="flex justify-center items-center w-1/12 h-1/4 rounded-lg bg-orange font-mono text-2xl">
        Home
      </a>
      <div class="flex justify-center items-center w-1/12 h-1/4 rounded-lg bg-orange font-mono text-2xl">
        {$Bruker}
      </div>
    </div>
    <div class="flex flex-col items-center justify-between w-2/6 h-4/6 bg-yellow rounded-xl mt-16">
        <div class="flex flex-col w-5/6 h-2/6 justify-evenly">
            <input class="bg-purple text-xl rounded w-full h-12" type="email" bind:value={BrukerNavn} placeholder="Bruker Navn" />
            <input class="bg-purple text-xl rounded w-full h-12" type="password" bind:value={Password} placeholder="Password" />
        </div>
        <div class="flex justify-evenly w-5/6 h-1/6">
            <button class="bg-orange text-2xl w-28 h-12 rounded" on:click={()=>login()}>Login</button>
            <button class="bg-orange text-2xl w-28 h-12 rounded" on:click={()=>register()}>Register</button>
        </div>
    </div>
  </div>
  