import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <div className="mt-15 mb-20">
      <div className=" mb-3  flex-col  justify-start ">
        <h2 className=" font-semibold text-3xl italic md:text-3xl ">
          requently Asked Questions
        </h2>
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl italic">
            How does a home valuation tool work?
          </AccordionTrigger>
          <AccordionContent className="flex text-lg text-start italic text-neutral-400 flex-col gap-4 text-balance">
            <p>
              A home valuation tool, also known as an automated valuation model
              (AVM), provides a quick estimate of your home’s potential value.
              An AVM uses publicly available real estate information, which is
              processed to determine a suggested property value. Typically,
              valuation tools consider recent sales data, local market trends
              and the unique characteristics of a property.
            </p>
            <p>
              Every valuation tool is slightly different, so our Home Valuation
              Report includes data from four different AVMs to help you
              determine the best list price for your home. A valuation tool
              cannot replace the expertise and market knowledge of an
              experienced real estate agent, but a Home Valuation Report will
              help you set the best list price for your home.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl italic">
            How accurate is the home value estimate?
          </AccordionTrigger>
          <AccordionContent className="flex text-lg text-start italic text-neutral-400 flex-col gap-4 text-balance">
            <p>
              A home value estimate is only as good as the market data that it
              provides. Numerous online tools deliver an estimated value based
              on your address, but very few offer real data from home sales in
              your local market. The advantage of a Home Valuation Report is
              that it provides information on comparable properties, as well as
              an estimated value that is determined through four automated
              valuation models.
            </p>
            <p>
              While a home value estimate is based on current market data and
              comparable sales, its important to remember that no automated tool
              can account for every unique detail of your property. Weve
              provided a list of experts in your area that can review the
              results of the report. Consult one of these local real estate
              agents for the most accurate evaluation, or consider getting a
              home appraisal.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3 ">
          <AccordionTrigger className="text-xl italic">
            Is this estimate the same as a formal appraisal?
          </AccordionTrigger>
          <AccordionContent className="flex text-lg text-start italic text-neutral-400 flex-col gap-4 text-balance">
            <p>
              No, our estimated home value is not a substitute for a formal home
              appraisal. The Home Valuation Report provides general pricing
              information based on available data, while a licensed appraiser
              performs a detailed evaluation that is often required by lenders.
            </p>
            <p>
              You can use this estimate as a starting point to understand your
              home’s value. From there, a listing agent who understands your
              local real estate market can help you set the right price. When
              your home goes under contract, the buyer is likely to seek a
              formal appraisal as part of the mortgage process.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-xl italic">
            What factors affect my home’s value?
          </AccordionTrigger>
          <AccordionContent className="flex text-lg text-start italic text-neutral-400 flex-col gap-4 text-balance">
            <p>
              There are several factors that influence your home’s estimated
              value. These include the propertys location, size, number of
              bedrooms and bathrooms, and overall condition. The area where your
              home is located also plays a role in the value of your home. The
              surrounding neighborhood, recent comparable sales and market
              conditions help determine your estimated home value.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
