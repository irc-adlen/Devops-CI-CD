# 3-1 Document your inventory and base commands

```yaml
all: # group containing all hosts
  vars: # Variables that apply to all hosts under this group
    ansible_user: admin # The default SSH user for Ansible connections
    ansible_ssh_private_key_file: TP3/ansible/inventories/id_rsa # Path to the SSH private key for ssh auth

  children: # sub-groups of hosts under "all"
    prod: # Name of a subgroup
      hosts: # List of individual hosts under the "prod" group
        adlen.cherif.takima.cloud # hostname of the target server
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

```yaml
# Install the necessary system packages for Docker
- name: Install required system packages
  apt:
    name:
      - apt-transport-https # Allows secure transport of APT packages over HTTPS
      - ca-certificates # Ensures secure communication by verifying SSL certificates
      - curl # Command-line tool for fetching and transferring data via URLs
      - gnupg # Tool for encrypting and signing data, required for managing GPG keys
      - lsb-release # Provides information about the Linux distribution release
      - python3-venv # Allows the creation of isolated Python environments
    state: latest # Ensures the latest versions of these packages are installed
    update_cache: yes # Refreshes the package list before installation

# Add Docker’s official GPG key to verify package authenticity
- name: Add Docker GPG key
  apt_key:
    url: https://download.docker.com/linux/debian/gpg # URL of Docker’s official GPG key
    state: present # Ensures the key is added if not already present

# Add the official Docker repository for package installation
- name: Add Docker APT repository
  apt_repository:
    repo: "deb [arch=amd64] https://download.docker.com/linux/debian {{ ansible_facts['distribution_release'] }} stable"
    state: present # Ensures the repository is added
    update_cache: yes # Updates the package list after adding the repository

# Install Docker from the official Docker repository
- name: Install Docker
  apt:
    name: docker-ce # Installs the Docker Community Edition (CE)
    state: present # Ensures the package is installed

# Install Python3 and pip3 for managing Python-based applications and dependencies
- name: Install Python3 and pip3
  apt:
    name:
      - python3 # Installs Python 3, which is required for running Python applications
      - python3-pip # Installs pip3, which is used to manage Python packages
    state: present # Ensures both packages are installed

# Create a virtual environment for Python packages (for better dependency management)
- name: Create a virtual environment for Docker SDK
  command: python3 -m venv /opt/docker_venv
  args:
    creates: /opt/docker_venv # Prevents the command from running if the directory already exists
  # A virtual environment ensures Python dependencies remain isolated and do not interfere with system packages

# Install the Docker SDK for Python inside the virtual environment
- name: Install Docker SDK for Python in virtual environment
  command: /opt/docker_venv/bin/pip install docker
  # This allows Ansible to interact with Docker using the Python API instead of CLI commands

# Ensure that the Docker service is running and will start on boot
- name: Make sure Docker is running
  service:
    name: docker # Refers to the Docker daemon
    state: started # Ensures Docker is running
    enabled: yes # Ensures Docker starts automatically at system boot
  tags: docker # Assigns the "docker" tag to this task for easier execution targeting
```

# 3-3 Document your docker_container tasks configuration.

```yaml
# Create and run the proxy container
- name: Run proxy
  docker_container:
    name: httptp3 # The name of the container
    image: krateros/tp-devops-http-server:latest # Use the latest version of the proxy image
    volumes:
      - ./httpd.conf:/usr/local/apache2/conf/httpd.conf # Mount the custom Apache configuration file
    pull: yes # Always pull the latest version of the image before running
    published_ports:
      - "80:80" # Map port 80 on the host to port 80 in the container
      - "8080:8081" # Map port 8080 on the host to port 8081 in the container
    networks:
      - name: outside # Connect the container to the 'outside' network
      - name: front # Connect the container to the 'front' network
```

```yaml
# Create and run the database container
- name: Run database
  docker_container:
    name: tp3db # The name of the database container
    image: krateros/tp-devops-database:latest # Use the latest database image
    pull: yes # Always pull the latest version of the image before running
    env_file: /.env # Load environment variables from the .env file
    networks:
      - name: inside # Connect the container to the 'inside' network
    volumes:
      - db-volume:/var/lib/postgresql/data # Use a persistent volume to store database data
```
