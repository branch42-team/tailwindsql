"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalFloatingButton() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "consultancy" });
      cal("floatingButton", {
        calLink: "branch42-team/consultancy",
        config: { layout: "month_view" },
      });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return null;
}
