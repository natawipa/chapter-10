# 
# Remove containers from Kubernetes.
#
# Usage:
#
#   ./scripts/local-kub/delete.sh (from project root)
#

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Change to scripts directory for kubectl commands  
cd "${SCRIPT_DIR}"

kubectl delete -f rabbit.yaml
kubectl delete -f mongodb.yaml
kubectl delete -f metadata.yaml
kubectl delete -f history.yaml
kubectl delete -f mock-storage.yaml
kubectl delete -f video-streaming.yaml
kubectl delete -f video-upload.yaml
kubectl delete -f advertise.yaml
kubectl delete -f gateway.yaml