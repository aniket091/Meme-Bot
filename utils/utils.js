module.exports = {
  
  async resolve(message, args) {
    i = 0;
    await args.forEach(arg => {
      if (arg.includes('<@')) {
        let id = arg.replace(/[\\<>@#&!]/g, '');
  
        if (arg.includes('&')) {
          role = message.guild.roles.cache.get(id);
          if (role) args[i] = role.name;
        } else {
          let mem = message.guild.members.cache.get(id)
          if (mem) args[i] = mem.displayName;
        }
      }
      i++;
    });
  
    return args
  }
}