import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "./context/LanguageContext";
import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import FestivalHighlights from "@/pages/FestivalHighlights";
import TestUpload from "@/pages/TestUpload";
import SubmissionV2Test from "@/pages/SubmissionV2Test";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/festival-highlights" component={FestivalHighlights} />
          <Route path="/submission-v2" component={SubmissionV2Test} />
          {/* Redirect old test-upload route to new submission-v2 route */}
          <Route path="/test-upload">
            {() => {
              window.location.href = '/submission-v2';
              return null;
            }}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </TooltipProvider>
    </LanguageProvider>
  );
}

export default App;
