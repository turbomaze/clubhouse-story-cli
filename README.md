## Clubhouse story cli

CLI to insert stories into Clubhouse.

## Usage

```bash
# File: ~/.bashrc or equivalent

...

# Set the default values for insert-story so you don't need to input them yourself
alias insert-story="insert-story 'default owner' 'unscheduled' 'engineering' 'your name'"
```

If you set up your defaults like this, then you can just do:

```bash
# Inserting a simple story 
insert-story name estimate

# Modifying the owner/workflow state/board
insert-story name estimate[ owner][ state][ board]
```

## License

MIT License: https://igliu.mit-license.org
