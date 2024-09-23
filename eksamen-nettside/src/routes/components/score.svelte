<script>
    export let user
    export let score
    export let index
</script>
  
  <div class="flex w-full mt-3 items-center justify-center">
    <span class="flex w-5/6 h-12 text-2xl justify-center text-center items-center text-sky rounded bg-navy">
      {index + 1}. {user}: {score}
    </span>
  </div>