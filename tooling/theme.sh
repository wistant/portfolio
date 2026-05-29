#!/bin/bash

# Colors & Style
export RED='\033[0;31m'
export GREEN='\033[0;32m'
export YELLOW='\033[1;33m'
export BLUE='\033[0;34m'
export CYAN='\033[0;36m'
export BOLD='\033[1m'
export RESET='\033[0m'
export NC='\033[0m'
export GRAY='\033[1;30m'

logo() {
  local CURRENT_VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "0.0.0")
  echo -e "\n  ${CYAN}██╗    ██╗██╗███████╗████████╗ █████╗ ███╗   ██╗████████╗"
  echo -e "  ${CYAN}██║    ██║██║██╔════╝╚══██╔══╝██╔══██╗████╗  ██║╚══██╔══╝"
  echo -e "  ${CYAN}██║ █╗ ██║██║███████╗   ██║   ███████║██╔██╗ ██║   ██║   "
  echo -e "  ${CYAN}██║███╗██║██║╚════██║   ██║   ██╔══██║██║╚██╗██║   ██║   "
  echo -e "  ${CYAN}╚███╔███╔╝██║███████║   ██║   ██║  ██║██║ ╚████║   ██║   "
  echo -e "  ${CYAN} ╚══╝╚══╝ ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ${NC}"
  echo -e "                                                        v${CURRENT_VERSION}"
  echo -e "\n  ${GRAY}${BOLD}[ Wistant portfolio Release Orchestrator ]${NC}"
  echo -e "  ${GRAY}⚙️ GitHub: https://github.com/wistant/portfolio${NC}"
  echo -e "  ${GRAY}📚 Docs:   https://wistant.me${NC}\n"
}

info()    { echo -e "${CYAN}│${NC}  ${BLUE}::${NC} $*"; }
success() { echo -e "${CYAN}│${NC}  ${GREEN}OK${NC} $*"; }
warn()    { echo -e "${CYAN}│${NC}  ${YELLOW}WARN${NC} $*"; }
error()   { echo -e "${CYAN}│${NC}  ${RED}ERR${NC} $*"; }
divider() { echo ""; }

header() {
  local raw_title="$*"
  
  if [[ -z "$raw_title" ]]; then
    return
  fi
  
  # If it looks like "Step X: Title"
  if [[ "$raw_title" =~ Step\ [0-9]+: ]]; then
    local step_num=$(echo "$raw_title" | grep -oP '(?<=Step )[0-9]+' || echo "0")
    local title=$(echo "$raw_title" | awk -F': ' '{print $2}' || echo "$raw_title")
    
    if [ "$step_num" != "0" ]; then
      echo -e "${CYAN}└─${NC}"
    fi
    
    local percent=$(( 100 * step_num / 6 ))
    local filled=$(( 20 * percent / 100 ))
    local empty=$(( 20 - filled ))
    local bar="" space=""
    [[ $filled -gt 0 ]] && bar=$(printf "%0.s#" $(seq 1 $filled))
    [[ $empty -gt 0 ]] && space=$(printf "%0.s " $(seq 1 $empty))
    
    echo -e "\n${CYAN}┌─ [${step_num}/6] ${BOLD}${title^^}${NC}"
    echo -e "${CYAN}│${NC}  Progress: ${CYAN}[${bar}${space}] ${percent}%${NC}"
    echo -e "${CYAN}│${NC}"
  else
    # Simple header
    echo -e "\n${CYAN}┌─ ${BOLD}${raw_title^^}${NC}"
    echo -e "${CYAN}│${NC}"
  fi
}
