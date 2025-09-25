import { useReadContract } from 'wagmi';
import ContractABI from '../constant/BnbCapital.json';

const contractAddress = '0x8447592F16b45c7E84cC301f82Dc516A1bD645cA';

export function useTvl() {
  return useReadContract({
    address: contractAddress,
    abi: ContractABI.abi,
    functionName: 'contractInfo',
  });
}

export function useTotUser() {
  return useReadContract({
    address: contractAddress,
    abi: ContractABI.abi,
    functionName: 'totalUsers',
  });
}

export function useTotRefPaid() {
  return useReadContract({
    address: contractAddress,
    abi: ContractABI.abi,
    functionName: 'totalUsers',
  });
}

export function useTotWithdraw() {
  return useReadContract({
    address: contractAddress,
    abi: ContractABI.abi,
    functionName: 'totalWithdrawn',
  });
}

export function useTotInvested() {
  return useReadContract({
    address: contractAddress,
    abi: ContractABI.abi,
    functionName: 'totalInvested',
  });
}
