export const useGlobalUtils = () => {
  const router = useRouter();

  const returnToMap = () => {
    router.push('/');
  };

  return {
    returnToMap,
  };
};
