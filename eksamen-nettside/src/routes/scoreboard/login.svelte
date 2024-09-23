<script>
    import { db } from '/src/lib/firebase';
    import { doc, setDoc, getDoc } from 'firebase/firestore';
    import { HighScore, Bruker, Popup } from '/src/stores'
    import bcrypt from 'bcryptjs'

    let BrukerNavn = ""
    let Password = ""

    async function login() {
    try {
      console.log("i runsss")
      const userDoc = await getDoc(doc(db, 'users', BrukerNavn))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        const PasswordMatch = await bcrypt.compare(Password, userData.Password)
        if (PasswordMatch) {
            console.log('User logged in:', BrukerNavn)
            console.log('User data:', userData)
            HighScore.set(userData.HighScore)
            Bruker.set(BrukerNavn)
            $Popup = false
        } 
        else {
          alert('Feil password')
        }
      } 
      else {
        alert('Denne brukeren finnes ikke')
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
        alert('brukeren finnes alerede')
      } 
      else {
        const HashedPassword = await bcrypt.hash(Password, 10)
        await setDoc(doc(db, 'users', BrukerNavn), {
        Password: HashedPassword,
        HighScore: 0
        })
        console.log('User registered:', BrukerNavn)   
        await login() 
        $Popup = false
      }
    } 
    catch (error) {
      console.error('Error registering:', error)
    }
  }
  </script>

      <div class="flex flex-col items-center justify-between absolute z-10 w-5/6 md:w-2/6 h-4/6 border-2 border-sky bg-blue rounded-xl mt-16">
        <div class="flex flex-col w-5/6 h-2/6 justify-evenly">
            <input class="bg-navy text-xl rounded w-full h-12" type="email" bind:value={BrukerNavn} placeholder="Bruker Navn" />
            <input class="bg-navy text-xl rounded w-full h-12" type="password" bind:value={Password} placeholder="Password" />
        </div>
        <div class="flex justify-evenly w-5/6 h-1/6">
            <button class="bg-navy btn text-2xl w-28 h-12 rounded" on:click={()=>login()}>Login</button>
            <button class="bg-navy btn text-2xl w-12 h-12 rounded" on:click={()=>Popup.set(false)}>X</button>
            <button class="bg-navy btn text-2xl w-28 h-12 rounded" on:click={()=>register()}>Register</button>
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
