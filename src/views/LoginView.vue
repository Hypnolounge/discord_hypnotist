<template>
  <main>
    <button class="discord-button">
      <img src="@/assets/discord_logo.png" alt="Discord Logo" class="discord-logo" />
      Login with Discord
    </button>
  </main>
</template>

<style>
.discord-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #7289da;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.discord-logo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
</style>
