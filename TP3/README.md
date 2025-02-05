# 3-1 Document your inventory and base commands

```yaml
all:  # group containing all hosts
  vars:  # Variables that apply to all hosts under this group
    ansible_user: admin  # The default SSH user for Ansible connections
    ansible_ssh_private_key_file: TP3/ansible/inventories/id_rsa  # Path to the SSH private key for ssh auth

  children:  # sub-groups of hosts under "all"
    prod:  # Name of a subgroup
      hosts:  # List of individual hosts under the "prod" group
        adlen.cherif.takima.cloud  # hostname of the target server
```

- `ansible all -i inventories/setup.yml -m ping`
    - `all`: to target all hosts
    - `-i`: to specify an inventory file
    - `-m ping`: use the module (`-m`) `ping` that obviously does a ping :)

- `ansible all -i inventories/setup.yml -m setup -a "filter=ansible_distribution*"`
    - `all`: to target all hosts
    - `-i`: to specify an inventory file
    - `-m setup`: use the module (`-m`) `setup`
    - `-a "filter=ansible_distribution*"`: to add argument (`-a`) and in this case `filter=ansible_distribution*`

- `ansible all -i inventories/setup.yml -m apt -a "name=apache2 state=absent" --become`
    - `all`: to target all hosts
    - `-i`: to specify an inventory file
    - `-m apt`: use the module (`-m`) `apt` that obviously deals with packages :)
    - `-a "name=apache2 state=absent"`: to add argument (`-a`) and in this case `name=apache2 state=absent`
    - `--become`: to run command as admin in the remote hosts

# 3-2 Document your playbook



# 3-3 Document your docker_container tasks configuration.

