package dev.emdashpolice;

import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class CaseCatalog {
    private static final int SHIFT_SECONDS = 480;

    private final List<GameCase> cases = List.of(
            new GameCase(
                    1,
                    "Mara Voss, sophomore",
                    "Reflection on the harbor cleanup",
                    "Student",
                    "The event was meaningful — not only because we removed bags of trash, but because it demonstrated the power of collective action. In today's fast-paced world, it is important to remember that small steps can make a big difference. Overall, the cleanup served as a reminder that community matters.",
                    true,
                    "Easy",
                    "/assets/mara_voss.jpg",
                    "The assignment asked for one specific moment from the cleanup. No moment is named.",
                    List.of("dash", "generic", "template"),
                    "The sample stacks an em dash with broad phrases like 'power of collective action' and an empty 'overall' summary."),
            new GameCase(
                    2,
                    "Luis Amaral, columnist",
                    "Notes from a broken ferry",
                    "Columnist",
                    "The ferry coughed twice, quit, and left us drifting beside a gull that seemed personally offended. I wrote the ending on the ticket stub because my notebook was under a leaky thermos. The delay was inconvenient, sure, but the captain's apology had better timing than my whole article.",
                    false,
                    "Easy",
                    "/assets/luis_amaral.jpg",
                    "Editor confirms Luis files drafts with odd transit notes and scratched-out punchlines.",
                    List.of("human", "specific"),
                    "Specific odd details and uneven personal texture outweigh polished suspicion."),
            new GameCase(
                    3,
                    "Northline Marketing",
                    "Productivity memo",
                    "Corporate",
                    "Our platform empowers teams to unlock seamless collaboration — helping every stakeholder move forward with confidence. By leveraging intelligent workflows, organizations can reduce friction, enhance outcomes, and drive measurable value across the entire ecosystem.",
                    true,
                    "Easy",
                    "/assets/northline_marketing.jpg",
                    "The file contains no product name, customer, date, or measurable target.",
                    List.of("dash", "generic", "template", "buzzword"),
                    "Buzzword density, template structure, and the dash all point toward generated copy."),
            new GameCase(
                    4,
                    "Ana Ribeiro, teacher",
                    "Parent night draft",
                    "Teacher",
                    "Please enter through the side door by the gym. The front hallway is still being painted, and it smells like a lemon argued with a swimming pool. I will bring the reading folders. Mr. Chen has the sign-in sheet because I lost the first one under a stack of glue sticks.",
                    false,
                    "Easy",
                    "/assets/ana_ribeiro.jpg",
                    "The school work order confirms paint in the front hallway this week.",
                    List.of("human", "specific"),
                    "Concrete logistics and strange but grounded sensory detail make this look human."),
            new GameCase(
                    5,
                    "Campus Life Office",
                    "Announcement for spring fair",
                    "Office",
                    "Join us for an unforgettable celebration of creativity, connection, and community. From exciting activities to delicious refreshments, there will be something for everyone. This event is more than a fair — it is an opportunity to come together and make lasting memories.",
                    true,
                    "Medium",
                    "/assets/campus_life_office.jpg",
                    "The announcement omits date, place, club names, and sign-up instructions.",
                    List.of("dash", "generic", "template"),
                    "The announcement leans on generic invitation language and a tidy concluding frame."),
            new GameCase(
                    6,
                    "Inez Ward, novelist",
                    "Workshop paragraph",
                    "Novelist",
                    "He called the soup brave — which was not a compliment — then ate three bowls because rent was due and pride had never paid it. I cut the second sentence twice. It still limps, but at least now it limps in the right direction.",
                    false,
                    "Medium",
                    "/assets/inez_ward.jpg",
                    "Workshop notes show two earlier versions of the second sentence.",
                    List.of("dash", "human", "revision"),
                    "There is an em dash, but revision talk and idiosyncratic phrasing make it a false positive."),
            new GameCase(
                    7,
                    "Grant applicant 42",
                    "Community garden impact",
                    "Applicant",
                    "The garden provides a vital space for neighbors to connect, learn, and grow — both literally and figuratively. In conclusion, this initiative highlights the importance of sustainability, inclusivity, and shared responsibility in building a brighter future for all.",
                    true,
                    "Medium",
                    "/assets/portrait-applicant.svg",
                    "The grant form asked for harvest totals. This answer supplies no numbers.",
                    List.of("dash", "generic", "template"),
                    "Formulaic transitions, abstract virtues, and a neat slogan finish make the case."),
            new GameCase(
                    8,
                    "Tom Beck, mechanic",
                    "Complaint letter",
                    "Mechanic",
                    "Your invoice says the truck needed a new alternator. It did not. I know this because the old one is still on the bench in my shop with my initials scratched into the side. Please call before Friday. I am tired of explaining this to your billing robot.",
                    false,
                    "Easy",
                    "/assets/portrait-mechanic.svg",
                    "The attached photo shows initials scratched into the alternator casing.",
                    List.of("human", "specific"),
                    "The complaint is direct, specific, and anchored by verifiable physical detail."),
            new GameCase(
                    9,
                    "Helio Foods",
                    "Sustainability statement",
                    "Corporate",
                    "At Helio Foods, we are committed to fostering a more sustainable future by embracing innovation, collaboration, and responsible stewardship. Our ongoing efforts reflect a deep dedication to people and planet — ensuring that every step forward creates positive impact for generations to come.",
                    true,
                    "Medium",
                    "/assets/portrait-corporate.svg",
                    "The compliance form asked for one packaging change. This statement gives none.",
                    List.of("dash", "generic", "template", "buzzword"),
                    "The branded opener cannot hide generic values language, empty impact claims, and a polished dash turn."),
            new GameCase(
                    10,
                    "Bea Nunes, lab assistant",
                    "Incident note",
                    "Lab",
                    "I dropped tray B at 9:12. Two tubes cracked, both from the algae trial, and the blue tape on the shelf stuck to my glove when I tried to catch them. Dr. Vale said to log it before lunch. I am logging it now because lunch is staring at me from the windowsill.",
                    false,
                    "Medium",
                    "/assets/portrait-lab.svg",
                    "The lab inventory shows tray B and algae trial tubes were checked out this morning.",
                    List.of("human", "specific"),
                    "Time, object labels, and mundane consequences make this practical note look human."),
            new GameCase(
                    11,
                    "City Transit Desk",
                    "Delay apology",
                    "Office",
                    "We sincerely apologize for any inconvenience caused by today's service disruption. We understand that reliable transportation is essential — and we remain committed to improving communication, restoring confidence, and delivering the dependable service our riders deserve.",
                    true,
                    "Medium",
                    "/assets/portrait-office.svg",
                    "The notice never names the route, station, time window, or cause of the disruption.",
                    List.of("dash", "generic", "template"),
                    "A public apology can be formal, but this one avoids every operational detail."),
            new GameCase(
                    12,
                    "Nora Pike, baker",
                    "Recipe margin",
                    "Baker",
                    "Do not trust the oven when the rain starts. It runs cold by maybe fifteen degrees, unless the back door is open, in which case it gets dramatic and burns the left tray. Add cardamom after the second fold. Tell Eli the scale is not haunted; it just hates the metal bowl.",
                    false,
                    "Hard",
                    "/assets/portrait-baker.svg",
                    "The bakery repair log mentions a faulty thermostat and a dented metal bowl.",
                    List.of("human", "specific"),
                    "Odd local constraints and practical revision notes carry strong human texture."),
            new GameCase(
                    13,
                    "Ravel Analytics",
                    "Hiring blurb",
                    "Corporate",
                    "The ideal candidate will thrive in a fast-paced environment, demonstrate excellent communication skills, and contribute to a culture of innovation. This role offers a unique opportunity to make an impact — supporting cross-functional teams as they scale meaningful solutions.",
                    true,
                    "Hard",
                    "/assets/portrait-corporate.svg",
                    "The job post does not name a tool, reporting line, salary band, or project.",
                    List.of("dash", "generic", "template", "buzzword"),
                    "Job posts can be bland, but this one is almost entirely reusable template language."),
            new GameCase(
                    14,
                    "Mateo Cruz, stage manager",
                    "Cue sheet note",
                    "Theater",
                    "Blackout after the kettle whistle, not after the door slam. Tess keeps slamming early when the handle sticks. If the fog machine coughs again, skip cue 14 and let the lamp do the ghost work. I put tape on the good cable. It is the ugly green one.",
                    false,
                    "Hard",
                    "/assets/portrait-stage.svg",
                    "The prop report confirms the sticky handle and the green replacement cable.",
                    List.of("human", "specific", "revision"),
                    "The note is full of production-specific contingencies and rough working language."),
            new GameCase(
                    15,
                    "Open Civic Forum",
                    "Volunteer thank-you",
                    "Office",
                    "Your dedication made this event possible. From setup to cleanup, each volunteer played an important role in creating a welcoming and inclusive environment. Together, we demonstrated the power of civic engagement — and showed what can happen when people unite around a shared purpose.",
                    true,
                    "Hard",
                    "/assets/portrait-office.svg",
                    "The organizer requested names for individual thank-you notes. None appear here.",
                    List.of("dash", "generic", "template"),
                    "The message gestures at gratitude without naming any person, task, mishap, or result."),
            new GameCase(
                    16,
                    "Priya Sato, archivist",
                    "Donation record",
                    "Archivist",
                    "Box 3 smells like basement water and cloves. The donor says the postcards belonged to her aunt, but three are addressed to a landlord in Camden, so ask before labeling the set. Keep the cracked red button with the letters. It was wrapped in the 1948 map.",
                    false,
                    "Hard",
                    "/assets/portrait-archivist.svg",
                    "The accession checklist lists Box 3, a 1948 map, postcards, and a red button.",
                    List.of("human", "specific", "contradiction"),
                    "The writer flags uncertainty and preserves conflicting evidence instead of smoothing it away."));

    public List<GameCase> all() {
        return cases;
    }

    public Optional<GameCase> find(int id) {
        return cases.stream()
                .filter(gameCase -> gameCase.id() == id)
                .findFirst();
    }

    public GameStatus status() {
        return new GameStatus("Em Dash Police", cases.size(), SHIFT_SECONDS);
    }
}
