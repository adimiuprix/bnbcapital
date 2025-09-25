import { useReadContract } from 'wagmi';
import ContractABI from '../constant/BnbCapital.json';

const contractAddress = '0x8447592F16b45c7E84cC301f82Dc516A1bD645cA';

export function useTotalWithdrawn() {
  return useReadContract({
    address: contractAddress,
    abi: ContractABI.abi,
    functionName: 'totalWithdrawn',
    unit: 'ether',
  });
}