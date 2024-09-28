import { Card, CardContent } from "./ui/card";

interface BalanceBoxProps {
  balance: number;
  totalAmount: number;
}

export function BalanceBox({ balance, totalAmount }: BalanceBoxProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-64 bg-background/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Balance:</span>
            <span>${balance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Amount:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
